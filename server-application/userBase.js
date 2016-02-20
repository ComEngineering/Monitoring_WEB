var mysql = require('mysql');

var connection = mysql.createConnection({
     host     : 'localhost'
    ,user     : 'root'
    ,password : 'newpass'
   // ,socketPath: '/var/lib/mysql/mysql.sock',
});

var userBase = {};

userBase.initialize = function() {
    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            throw "Database connection error";
        }
        console.log('Connected as id ' + connection.threadId);

        connection.query('CREATE DATABASE IF NOT EXISTS `teko` CHARACTER SET utf8 COLLATE utf8_general_ci', checkResult);
        console.log('database created');
        connection.query('USE teko', checkResult);
        console.log('use teko');
        connection.query("SELECT * FROM information_schema.tables WHERE table_schema = 'teko' AND table_name = 'userbase' LIMIT 1", function(err, res) {
            checkResult(err);
            console.log(JSON.stringify(res));
            
            if (res.length === 0) {
                console.log('create schema');
                connection.query("CREATE TABLE IF NOT EXISTS userbase (ID INTEGER PRIMARY KEY AUTO_INCREMENT, name VARCHAR(30) NOT NULL, password VARCHAR(30) NOT NULL, permissions VARCHAR(10) NOT NULL)", checkResult);
                connection.query("INSERT INTO userbase (name, password, permissions) VALUES ('admin', 'admin', 'admin')", checkResult);
            }
        });  
    });
};

userBase.get = function(name, done) {
    connection.query("SELECT password,permissions FROM userbase WHERE name=?", name, function(err, res) {
        if(err) {
            done(null);
        } else {
            console.log("!!!!!"+JSON.stringify(res));
            done(res[0]);
        }
    });
};

userBase.add = function(name, password, perminssions) {
    connection.query("INSERT INTO userbase SET ?", {name: name, password: password, permissions: perminssions}, checkResult);
};

userBase.remove = function(name) {
    connection.query("DELETE FROM userbase WHERE name=?",name, function(err) {});
};

userBase.edit = function(name, password, permissions) {
    connection.query("UPDATE userbase SET password=?,permissions=? WHERE name=?", [password,perminssions,name], function(err) {});
};

function checkResult(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        throw "Database connection error";
    }
};

module.exports = userBase;

