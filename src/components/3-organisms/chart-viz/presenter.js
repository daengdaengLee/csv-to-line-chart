import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import * as d3 from 'd3';
import randomColor from 'randomcolor';

const MARGIN = 40;

class ChartViz extends Component {
  constructor(props) {
    super(props);
    this._container = React.createRef();
    this._canvas = React.createRef();
    this._xG = React.createRef();
    this._yG = React.createRef();
    this._getContainerSize = this._getContainerSize.bind(this);
    this._getXExtent = this._getXExtent.bind(this);
    this._getYExtent = this._getYExtent.bind(this);
    this._draw = this._draw.bind(this);
  }

  render() {
    const {
      _container,
      _canvas,
      _xG,
      _yG,
      props: { isOpen, isLoading, isError, currentId },
    } = this;
    return (
      isOpen &&
      (isError ? (
        <div>Something broken</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              height: '2rem',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '1rem',
            }}
          >
            {currentId}
          </div>
          <div ref={_container} style={{ flexGrow: 1, position: 'relative' }}>
            <canvas style={{ position: 'absolute' }} ref={_canvas} />
            <svg
              style={{ position: 'absolute', width: '100%', height: '100%' }}
            >
              <g transform={`translate(${MARGIN}, ${MARGIN})`}>
                <g ref={_xG} />
                <g ref={_yG} />
              </g>
            </svg>
          </div>
        </div>
      ))
    );
  }

  componentDidMount() {
    this._draw();
  }

  componentDidUpdate() {
    this._draw();
  }

  _getContainerSize() {
    const {
      _container: { current: el },
    } = this;
    if (!el) return [0, 0];
    return [el.clientWidth, el.clientHeight];
  }

  _getXExtent() {
    const { allSeriesIds, seriesesById } = this.props;
    const allMaxs = _.map(
      allSeriesIds,
      id => seriesesById[id].points.length - 1,
    );
    const maxX = _.max(allMaxs);
    return [0, maxX];
  }

  _getYExtent() {
    const { allSeriesIds, seriesesById } = this.props;
    const yExtents = _.map(allSeriesIds, id => {
      const series = seriesesById[id];
      return {
        minY: _.min(series.points, obj => obj.y).y,
        maxY: _.max(series.points, obj => obj.y).y,
      };
    });
    const minY = _.min(yExtents, obj => obj.minY).minY;
    const maxY = _.max(yExtents, obj => obj.maxY).maxY;
    return [minY, maxY];
  }

  _draw() {
    const {
      _canvas: { current: canvas },
      _xG: { current: xG },
      _yG: { current: yG },
      _getContainerSize,
      _getXExtent,
      _getYExtent,
      props: { allSeriesIds, seriesesById },
    } = this;
    if (!canvas || !xG || !yG) return;
    const containerSize = _getContainerSize();
    const [containerWidth, containerHeight] = containerSize;
    canvas.width = containerWidth;
    canvas.height = containerHeight;
    const ctx = canvas.getContext('2d');
    const [minX, maxX] = _getXExtent();
    const [minY, maxY] = _getYExtent();
    const width = containerWidth - 2 * MARGIN;
    const height = containerHeight - 2 * MARGIN;
    const xScale = d3
      .scaleLinear()
      .domain([minX, maxX])
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([maxY, minY])
      .range([0, height]);
    const xAxis = d3.axisBottom().scale(xScale);
    const yAxis = d3.axisLeft().scale(yScale);
    ctx.translate(MARGIN, MARGIN);
    for (let seriesId of allSeriesIds) {
      const series = seriesesById[seriesId];
      ctx.beginPath();
      d3
        .line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .context(ctx)(series.points);
      ctx.strokeStyle = randomColor();
      ctx.stroke();
    }
    d3.select(xG)
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);
    d3.select(yG).call(yAxis);
  }
}

ChartViz.defaultProps = {
  isOpen: false,
  isLoading: false,
  isError: false,
  currentId: '',
  allSeriesIds: [],
  seriesesById: {},
};

ChartViz.propTypes = {
  isOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  currentId: PropTypes.string,
  allSeriesIds: PropTypes.array,
  seriesesById: PropTypes.object,
};

export default ChartViz;
