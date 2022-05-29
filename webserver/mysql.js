var mysql=require('mysql')

var pool=mysql.createPool({
	host:'localhost',
	port:3306,
	user:'hyy',//test
	password:'123456',//123456
	database:'usermgr'
})//连接池

function query(sql,params=null,callback){//语句 参数 回调函数
    pool.getConnection(function(err,connection){//u管成功失败都会调用函数
        if(err){
            console.log(err)
            callback(err)
        }else{
            //selsct =？
            connection.query(sql,params,function(err,results)
            {
				console.log(results)
				callback(err,results) //结果回调
				connection.release()//释放连接回连接池
            })
        }
    })
}

module.exports={
    query
}//暴露这个方法