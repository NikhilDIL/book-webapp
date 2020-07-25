import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const UserProfileInfo = () => {
    const { state: { user }, changePassword, changeEmail } = useContext(AuthContext);
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
        // changePassword({email: newEmail});
        changeEmail({email: newEmail});
        console.log('email changed');
        setEmailInfo({
            newEmail: '',
            confirmNewEmail: ''
        });
    }
    const onSubmitPass = (e) => {
        e.preventDefault();
        // check if current password is valid and if newPass and confirmNewPass are equal
        changePassword({password: newPassword});
        console.log('password changed');
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
