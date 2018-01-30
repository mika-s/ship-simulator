import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AzimuthThruster from '../../misc/AzimuthThruster/AzimuthThruster';
import TunnelThruster from '../../misc/TunnelThruster/TunnelThruster';
import '../Control.css';

class Lever extends Component {
  static mapThrusterToRowAndCol(thrusters) {
    let xVals = [];
    let yVals = [];

    for (let thrIdx = 0; thrIdx < thrusters.length; thrIdx += 1) {
      xVals.push(thrusters[thrIdx].location.x);
      yVals.push(thrusters[thrIdx].location.y);
    }

    xVals = xVals.filter((value, index, array) => array.indexOf(value) === index);
    yVals = yVals.filter((value, index, array) => array.indexOf(value) === index);

    const rows = xVals.length;
    const cols = yVals.length;

    xVals.sort((a, b) => b - a);
    yVals.sort((a, b) => a - b);

    const grid = [];
    for (let rowIdx = 0; rowIdx < xVals.length; rowIdx += 1) {
      const row = [];
      for (let colIdx = 0; colIdx < yVals.length; colIdx += 1) {
        row.push({ x: xVals[rowIdx], y: yVals[colIdx] });
      }
      grid.push(row);
    }

    return {
      xVals, yVals, rows, cols, grid,
    };
  }

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { thrusters } = this.props;
    const layout = Lever.mapThrusterToRowAndCol(thrusters);
    const columnWidth = Math.round(12 / layout.cols);

    const rows = [];
    for (let rowIdx = 0; rowIdx < layout.rows; rowIdx += 1) {
      const cols = [];
      for (let colIdx = 0; colIdx < layout.cols; colIdx += 1) {
        let isThrusterColumn = false;
        for (let thrIdx = 0; thrIdx < thrusters.length; thrIdx += 1) {
          if (thrusters[thrIdx].location.x === layout.grid[rowIdx][colIdx].x &&
            thrusters[thrIdx].location.y === layout.grid[rowIdx][colIdx].y) {
            isThrusterColumn = true;
            cols.push((
              <div className={`col-lg-${columnWidth}`} key={colIdx * 100}>
                {thrusters[thrIdx].thrusterType === 'tunnel' &&
                  <TunnelThruster
                    thrusterData={thrusters[thrIdx]}
                    setThrusterDemand={this.props.setThrusterDemand}
                  />
                }
                {thrusters[thrIdx].thrusterType === 'azimuth' &&
                  <AzimuthThruster
                    thrusterData={thrusters[thrIdx]}
                    setThrusterDemand={this.props.setThrusterDemand}
                  />
                }
              </div>));
          }
        }

        if (!isThrusterColumn) {
          cols.push(<div className={`col-lg-${columnWidth}`} key={colIdx * 100} />);
        }
      }

      rows.push(<div className="row" key={rowIdx * 10}>{cols}</div>);
    }

    return (
      <div className="lever">
        <div className="thrusters">
          {rows}
        </div>
      </div>
    );
  }
}

Lever.propTypes = {
  thrusters: PropTypes.arrayOf(PropTypes.object).isRequired,
  setThrusterDemand: PropTypes.func.isRequired,
};

export default Lever;
