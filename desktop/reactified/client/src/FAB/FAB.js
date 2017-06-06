import React, { Component } from 'react';

import { SpeedDial, SpeedDialItem } from 'react-mui-speeddial';

import Add from 'material-ui/svg-icons/content/add';
import Close from 'material-ui/svg-icons/navigation/close';
import Done from 'material-ui/svg-icons/action/done';
import LightbulbOutline from 'material-ui/svg-icons/action/lightbulb-outline';

import NewTaskDialog from './NewTaskDialog';

import * as time from '../time';

import {
  green600,
  yellow800,
} from 'material-ui/styles/colors';

class FAB extends Component {
  constructor() {
    super();
    this.state = {
      taskDialogOpen: false,
    };
  }
  handleRequestClose = () => {
    this.setState({
      taskDialogOpen: false,
    });
  }
  handleRequestTaskDialogOpen = () => {
    this.setState({
      taskDialogOpen: true,
    });
  }
  handleRequestTaskAdd = (taskInfo) => {
    const startDays = taskInfo.start * taskInfo.startValue;
    console.log(startDays);
    const periodDays = taskInfo.period * taskInfo.periodValue;
    const repetitionDays = taskInfo.repetition * taskInfo.repetitionValue;
    const start = time.addDays(time.today(), startDays);
    const end = time.addDays(start, periodDays);
    this.props.addTask({
      task: taskInfo.task,
      start,
      end,
      estimation: taskInfo.estimation * taskInfo.estimationValue,
      repetition: repetitionDays,
    });
    this.handleRequestClose();
  }
  render() {
    const styles = {
      speedDial: {
        position: 'absolute',
        right: '20px',
        bottom: '20px',
        zIndex: 1000,
      },
      newTask: {
        color: green600,
      },
      newIdea: {
        color: yellow800,
      },
    };
    return (
      <SpeedDial
        className="SpeedDial"
        fabContentOpen={<Add />}
        fabContentClose={<Close />}
        style={styles.speedDial}
      >
        <SpeedDialItem
          fabContent={<Done />}
          onTouchTap={this.handleRequestTaskDialogOpen}
        />
        <SpeedDialItem
          fabContent={<LightbulbOutline />}
        />
        <NewTaskDialog
          open={this.state.taskDialogOpen}
          onRequestClose={this.handleRequestClose}
          onRequestAdd={this.handleRequestTaskAdd}
        />
      </SpeedDial>
    );
  }
}

export default FAB;
