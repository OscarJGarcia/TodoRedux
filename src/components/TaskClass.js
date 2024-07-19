import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadTasks } from '../store/tasks';

export class TaskClass extends Component {
    componentDidMount() {
        this.props.loadTasks();
    }

    render() {
        return (
            <div>{this.props.tasks.map(task => <p key={task.id}>{task.task}</p>)}</div>
        )
    }
}
const mapStateToProps = state => ({
    tasks: state.tasks.tasks
})

const mapDispatchToProps = (dispatch) => dispatch => ({
    loadTasks: () => dispatch(loadTasks())
})
export default connect(mapStateToProps, mapDispatchToProps)(TaskClass);