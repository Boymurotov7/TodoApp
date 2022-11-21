import TodoModel from '../models/todo.js'

export const getAll = async(req,res)=>{
    try{
        let { limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit

        const Todos = await TodoModel.find().skip(offset).limit(limit).exec()
        
        res.json(Todos)
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: 'ne udalos poluchit todo'
        }); 
    }
}
export const getOne = async(req,res)=>{
    try{

        const TodoId = req.params.id
        TodoModel.findOneAndUpdate({
            _id: TodoId,
        },{
            $inc: { viewsCount: 1 }
        },
        {
            returnDocument: 'after'
        },
        (err,doc) => {
            if(err){
                console.log(err)
                return res.status(500).json({
                    message: 'ne udalos vernut todo'
                }); 
            }
            if(!doc){
                return res.status(404).json({
                    message: 'todo ne naydena'
                }); 
            }

            res.json(doc)
        },
        );

    }catch(err){
        console.log(err)
        res.status(500).json({
            message: 'ne udalos poluchit todo'
        }); 
    }
}

export const remove = async(req,res)=>{
    try{
        const TodoId = req.params.id
        TodoModel.findOneAndDelete({
            _id: TodoId,
        },
        (err,doc) => {
            if(err){
                console.log(err)
                return res.status(500).json({
                    message: 'ne udalos udalit todo'
                }); 
            }
            if(!doc){
                return res.todous(404).json({
                    message: 'todo ne naydena'
                }); 
            }

            res.json({
                success: true
            })
        },
        );

    }catch(err){
        console.log(err)
        res.status(500).json({
            message: 'ne udalos poluchit todo'
        }); 
    }
}

export const update = async(req,res)=>{
    try{
        const TodoId = req.params.id
        await TodoModel.updateOne({
            _id: TodoId,
        },
        {
            todobody: req.body.todobody,
            user: req.userId,
        },
        );

        res.json({
            success: true
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            message: 'ne udalos obnovit todo'
        }); 
    }
}
export const create = async(req,res)=>{
    try{
        const doc = new TodoModel({
            todobody: req.body.todobody,
            user: req.userId,
        })

        const Todo = await doc.save()
        

        res.json(Todo)
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: 'ne udalos sozdat todo'
    })
}
}