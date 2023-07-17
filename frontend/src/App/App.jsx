import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { history, Role } from '@/_helpers';
import { authenticationService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { HomePage } from '@/HomePage';
import { AdminPage } from '@/AdminPage';
import { StudentPage } from '@/StudentPage';
import { ProfessorPage } from '@/ProfessorPage';
import { LoginPage } from '@/LoginPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false,
            isProfessor: false,
            isStudent: false
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isStudent: x && x.role === Role.Student
        }));
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isProfessor: x && x.role === Role.Professor
        }));
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isAdmin: x && x.role === Role.Admin
        }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser, isStudent, isAdmin, isProfessor } = this.state;
        return (
            <Router history={history}>
                <div>
                    {currentUser &&
                        <nav>
                            <div>
                                <Link to="/">Home</Link>
                                {isStudent && <Link to="/student">Student</Link>}
                                {isAdmin && <Link to="/admin">Admin</Link>}
                                {isProfessor && <Link to="/professor">Professor</Link>}
                                <a onClick={this.logout} className="">Logout</a>
                            </div>
                        </nav>
                    }
                    <div>
                        <div>
                            <div>
                                <div>
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <PrivateRoute path="/student" roles={[Role.Student]} component={StudentPage} />
                                    <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage} />
                                    <PrivateRoute path="/professor" roles={[Role.Professor]} component={ProfessorPage} />
                                    <Route path="/login" component={LoginPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export { App }; 