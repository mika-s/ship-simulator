import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AzimuthThruster from '../misc/AzimuthThruster/AzimuthThruster';
import TunnelThruster from '../misc/TunnelThruster/TunnelThruster';
import './Control.css';

class Lever extends Component {
  static numberOfRowsAndCols(thrusters) {
    const xVals = []; // 45, -45, -45
    const yVals = []; //  0,  -5,   5

    for (let thrIdx = 0; thrIdx < thrusters.length; thrIdx += 1) {
      xVals.push(thrusters[thrIdx].location.x);
      yVals.push(thrusters[thrIdx].location.y);
    }

    const rows = xVals.filter((value, index, array) => array.indexOf(value) === index).length;
    const cols = yVals.filter((value, index, array) => array.indexOf(value) === index).length;

    return { xVals, yVals, rows, cols };
  }

  static mapThrusterToRowAndCol(thrusters, data) {
    const grid = [];
    let { xVals, yVals } = data;

    xVals = xVals.filter((value, index, array) => array.indexOf(value) === index);
    yVals = yVals.filter((value, index, array) => array.indexOf(value) === index);
    xVals.sort((a, b) => b - a);
    yVals.sort((a, b) => a - b);

    for (let rowIdx = 0; rowIdx < xVals.length; rowIdx += 1) {
      const row = [];
      for (let colIdx = 0; colIdx < yVals.length; colIdx += 1) {
        row.push({ x: xVals[rowIdx], y: yVals[colIdx] });
      }
      grid.push(row);
    }
    console.log(grid);

    return grid;
  }

  constructor() {
    super();
    this.state = {};

    this.key = 100;
    this.getKey = this.getKey.bind(this);
  }

  getKey() {
    this.key += 1;
    return this.key;
  }

  render() {
    const { thrusters } = this.props;
    const rowsAndCols = Lever.numberOfRowsAndCols(thrusters);
    const grid = Lever.mapThrusterToRowAndCol(thrusters, rowsAndCols);
    const widthPerColumn = Math.round(12 / rowsAndCols.cols);

    const rows = [];
    for (let rowIdx = 0; rowIdx < rowsAndCols.rows; rowIdx += 1) {

      const cols = [];
      for (let colIdx = 0; colIdx < rowsAndCols.cols; colIdx += 1) {
        let isThrusterColumn = false;
        for (let thrIdx = 0; thrIdx < thrusters.length; thrIdx += 1) {

          if (thrusters[thrIdx].location.x === grid[rowIdx][colIdx].x &&
            thrusters[thrIdx].location.y === grid[rowIdx][colIdx].y) {
            isThrusterColumn = true;
            cols.push(
              <div className={`col-lg-${widthPerColumn}`} key={this.getKey()}>
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
              </div>);
          }
        }

        if (!isThrusterColumn) {
          cols.push(<div className={`col-lg-${widthPerColumn}`} key={this.getKey()} />);
        }
      }

      rows.push(<div className="row" key={this.getKey()}>{cols}</div>);
    }

    return (
      <div className="settings">
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
