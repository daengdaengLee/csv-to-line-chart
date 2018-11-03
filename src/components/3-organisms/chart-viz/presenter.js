import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import * as d3 from 'd3';
import randomColor from 'randomcolor';

class ChartViz extends Component {
  constructor(props) {
    super(props);
    this._container = React.createRef();
    this._canvas = React.createRef();
    this._draw = this._draw.bind(this);
  }

  render() {
    const {
      _container,
      _canvas,
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

  _draw() {
    const {
      _container,
      _canvas,
      props: { allSeriesIds, seriesesById },
    } = this;
    if (!_container.current || !_canvas.current) return;
    const {
      clientWidth: containerWidth,
      clientHeight: containerHeight,
    } = _container.current;
    _canvas.current.width = containerWidth;
    _canvas.current.height = containerHeight;
    const ctx = _canvas.current.getContext('2d');
    const minX = 0;
    const maxX = seriesesById[allSeriesIds[0]].points.length - 1;
    const yExtents = _.map(_.values(seriesesById), series => ({
      minY: _.min(series.points, obj => obj.y).y,
      maxY: _.max(series.points, obj => obj.y).y,
    }));
    const minY = _.min(yExtents, obj => obj.minY).minY;
    const maxY = _.max(yExtents, obj => obj.maxY).maxY;
    const xScale = d3
      .scaleLinear()
      .domain([minX, maxX])
      .range([0, containerWidth]);
    const yScale = d3
      .scaleLinear()
      .domain([maxY, minY])
      .range([0, containerHeight]);
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
