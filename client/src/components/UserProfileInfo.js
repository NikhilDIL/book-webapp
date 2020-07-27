import React, { useContext, useState } from 'react';
import Alert from './Alert';
import { AuthContext } from '../contexts/AuthContext';

const UserProfileInfo = () => {
    const { state: { user }, changePassword, changeEmail, verifyPassword } = useContext(AuthContext);
    const [emailAlert, setEmailAlert] = useState({display: false, msg: ''});
    const [passwordAlert, setPasswordAlert] = useState({display: false, msg: ''});
    const [emailInfo, setEmailInfo] = useState({
        newEmail: '',
        confirmNewEmail: ''
    })
    const [passwordInfo, setPasswordInfo] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const { currentPassword, newPassword, confirmNewPassword } = passwordInfo;
    const { newEmail, confirmNewEmail } = emailInfo;

    const onChangeEmail = (e) => setEmailInfo({...emailInfo, [e.target.name]: e.target.value});
    const onChangePass = (e) => setPasswordInfo({...passwordInfo, [e.target.name]: e.target.value});

    const onSubmitEmail = (e) => {
        // check if newEmail and confirmEmail are equal
        if (newEmail !== confirmNewEmail) {
            e.preventDefault();
            setEmailAlert({display: true, msg: 'Emails do not match'});
            setTimeout(() => setEmailAlert({display: false, msg: ''}), 4000);
        } else {
            changeEmail({email: newEmail});
        }
        setEmailInfo({
            newEmail: '',
            confirmNewEmail: ''
        });
    }
    const onSubmitPass = (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setPasswordAlert({display: true, msg: 'New password does not match'});
            setTimeout(() => setPasswordAlert({display: false, msg: ''}), 4000);
        } else {
            verifyPassword({
                email: user.email,
                password: currentPassword
            }).then(res => {
                if (!res) {
                    setPasswordAlert({display: true, msg: 'Incorrect Password'});
                    setTimeout(() => setPasswordAlert({display: false, msg: ''}), 4000);
                } else {
                    changePassword({password: newPassword});
                }
            });
        }

        setPasswordInfo({
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        });
    }

    return user && (
        <div className="container mb-4">
            <div style={{display: "flex", justifyContent: "center"}}>
                <p className="badge badge-primary mr-1">Username: {user.username}</p>
                <p className="badge badge-primary">Email: {user.email}</p>
            </div>

            {emailAlert.display && <Alert msg={emailAlert.msg}/>}
            {passwordAlert.display && <Alert msg={passwordAlert.msg}/>}
            
            <div>
                <h3>Change Email</h3>
                <form onSubmit={onSubmitEmail}>
                    <div className="row">
                        <div className="form-group col-md-3">
                            <input 
                                type="email" 
                                name="newEmail" 
                                value={newEmail}
                                className="form-control" 
                                placeholder="New Email"
                                onChange={onChangeEmail}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <input 
                                type="email" 
                                name="confirmNewEmail" 
                                value={confirmNewEmail}
                                className="form-control" 
                                placeholder="Confirm New Email"
                                onChange={onChangeEmail}
                            />
                        </div>
                        <div className="col-md-3">
                            <button type="submit" className="btn btn-dark">Change Email</button>
                        </div>
                    </div>
                </form>
            </div>
            <div>
                <h3>Change Password</h3>
                <form onSubmit={onSubmitPass}>
                    <div className="row">
                        <div className="form-group col-md-3">
                            <input type="password" 
                                name="currentPassword" 
                                value={currentPassword}
                                className="form-control" 
                                placeholder="Current Password"
                                onChange={onChangePass}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <input type="password" 
                                name="newPassword" 
                                value={newPassword}
                                className="form-control" 
                                placeholder="New Password"
                                onChange={onChangePass}
                            />
                        </div>
                        <div className="form-group col-md-3">
                            <input type="password" 
                                name="confirmNewPassword" 
                                value={confirmNewPassword}
                                className="form-control" 
                                placeholder="Confirm New Password"
                                onChange={onChangePass}
                            />
                        </div>
                        <div className="col-md-2">
                            <button type="submit" className="btn btn-dark">Change Password</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserProfileInfo;
