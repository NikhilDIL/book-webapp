import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
// import { BookListContext } from '../contexts/BookListContext';

const UserProfileInfo = () => {
    const { state: { user } } = useContext(AuthContext);
    // const { state: { favorites, finishedList, readingList } } = useContext(BookListContext); 
    return user && (
        <div className="container mb-4">
            <div style={{display: "flex", justifyContent: "center"}}>
                <p className="badge badge-primary mr-1">Username: {user.username}</p>
                <p className="badge badge-primary">Email: {user.email}</p>
            </div>
            
            <div>
                <h3>Change Email</h3>
                <div className="row">
                    <div className="form-group col-md-3">
                        <input type="email" className="form-control" placeholder="New Email"/>
                    </div>
                    <div className="form-group col-md-3">
                        <input type="email" className="form-control" placeholder="Confirm New Email"/>
                    </div>
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-dark">Change Email</button>
                    </div>
                </div>
            </div>
            <div>
                <h3>Change Password</h3>
                <div className="row">
                    <div className="form-group col-md-3">
                        <input type="password" className="form-control" placeholder="Current Password"/>
                    </div>
                    <div className="form-group col-md-3">
                        <input type="password" className="form-control" placeholder="New Password"/>
                    </div>
                    <div className="form-group col-md-3">
                        <input type="password" className="form-control" placeholder="Confirm New Password"/>
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-dark">Change Password</button>
                    </div>
                </div>
            </div>
            {/* <div className="mt-3" style={{display: "flex", justifyContent: "center"}}>
                <span className="badge badge-success mr-2">Finished: {finishedList.length}</span>
                <span className="badge badge-danger mr-2">Unread: {readingList.length}</span>
                <span className="badge badge-warning mr-2">Favorites: {favorites.length}</span>
            </div> */}
        </div>
    )
}

export default UserProfileInfo;
