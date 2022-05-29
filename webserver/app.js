const express=require('express')
const app=express()//框架对象创建实现web服务
const db=require("./mysql.js")//数据库导入
app.use(express.json())//解析客户端提交过来的json数据

//提供获取所有用户接口
app.get('/users',function(req,res,next){
	db.query("select * from users",[],function(err,results){
        if(err){
            res.json({code:500,data:null,message:err.sqlMessage})
        }else{
            res.json({code:200,data:results,message:'成功'})            
        }       
    })
})

//提供获取某个用户接口
app.get('/user',function(req,res,next){
	db.query("select * from users where id=?",[req.query.id],function(err,results){
        if(err){
            res.json({code:500,data:null,message:err.sqlMessage})
        }else{
            res.json({code:200,data:results,message:'成功'})            
        }       
    })
})

//供用户注册的接口（插入数据）
app.post('/reg',function(req,res,next){
	console.log(req.body)
    let name=req.body.data.name
    let password=req.body.data.password
	let money=req.body.data.money
	
	let sql =`INSERT INTO users(name,password,money)VALUES('${name}','${password}','${money}')`
    db.query(sql,[],function(err,results){
		if(err){
		    res.json({code:500,data:null,message:err.sqlMessage})
		}else{
		    res.json({code:200,data:results,message:'注册成功'})            
		}   
	
	})
})

//提供删除用户的接口
app.post('/user/del',function(req,res,next){
	let id=req.body.data.id
	let sql=`delete from users where id=?`
	db.query(sql,[id],function(err,results){
        if(err){
            res.json({code:500,data:null,message:err.sqlMessage})
        }else{
            res.json({code:200,data:results,message:'删除成功'})            
        }       
    })
})

//供余额充值的接口
app.post('/charge',function(req,res,next){
	console.log(req.body)
	let id=req.body.data.id
	let money =req.body.data.money
	console.log("id="+id+",money="+money)
	let sql=`update users set money=money+? where id=?`
	db.query(sql,[money,id],function(err,results){
        if(err){
            res.json({code:500,data:null,message:err.sqlMessage})
        }else{
            res.json({code:200,data:results,message:'余额充值成功'})            
        }       
    })
})

const port=1234
// app.listen(port,function(){
// console.log("请访问：http://localhost:${port}")
// })

app.listen(port,()=>{//端口号1234
	console.log(`Example app listening on port ${port}`)
})