import * as React from 'react';
import { API } from 'aws-amplify';
import { RouteComponentProps } from 'react-router-dom';

type State = {
  courseList: any[];
};

class CoursesContainer extends React.Component<RouteComponentProps, State> {
  state = {
    courseList: []
  }

  componentDidMount() {
    this.fetchList().then(response => {
      this.setState({
        courseList: [...response]
      });
    });
  }

  async fetchList() {
    const response = await API.get("coursesApi", "/list", null);
    return response;
  }

  render() {
    const { courseList } = this.state;

    return (
      <React.Fragment>
        {courseList.map((course: any) => {
         return <React.Fragment>
            <div className="col-lg-4">
              <div className="widget-head-color-box navy-bg p-lg text-center">
                <div className="m-b-md">
                  <h2 className="font-bold no-margins">
                    {course.title}
                  </h2>
                  <small>{course.code}</small>
                </div>
              </div>
              <div className="widget-text-box">
                <h4 className="media-heading">{course.title}</h4>
                <p>{course.content1}</p>
                <div className="text-right">
                  credits: {course.credits}
                </div>
              </div>
            </div>
           <hr/>
          </React.Fragment>;
        })}
      </React.Fragment>
    );
  }
}

export default CoursesContainer;
