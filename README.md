# Kcity-ManageUser
1. Run app
- Create .ENV
+ DATABASE_URL="mysql://user:password@host:port/database"
+ Secret: (Using in jwt) ex:hoangnhan
+ Secret_Refresh:(Using in jwt) ex: hoangnhan

- Migrate data
+
- CMD run app
+ npm start

2.API docs
-API create user
+ URL: {domain}/users/create-user

    - Method: Post
    - Input : {
        email: (hoangnhan@gmail.com) require
        username: (hoangnhan)   require
        fullname: (HoangNhan)   require
        avatar: (Link path)     require
        status:                 require
        deleted:                require
    }
    
-API get list user
+ URL: {domain}/users/create-user
    -Method:Get
    - Input: page: AllowNull
    
-API filter status 
+ URL: {domain}/users/filter-status
    -Methoad: Get
    -Input: status: require
            page: allowNull
            
- API filter time
+URL: {domain}/users/filter-time
    -Methoad: Get
    -Input: status: require
            page: allowNull
            
- API get user by id
+URL:{domain}/users/get-user-by-id
    -Method:GET
    -input : id: require
    
    
-API update user
+URL:{domain}/users/update-user
    -Method: PUT
    -Input : id require
              username: allowNull
              fullname: allowNull
              status: allowNull
              deleted: allowNull
              avatar: allowNull
