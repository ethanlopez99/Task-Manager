from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///tasks.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255))
    status = db.Column(db.String(32))

with app.app_context():
    db.create_all()

@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()
    return jsonify({"tasks": [{"id": task.id, "name": task.name, "description": task.description, "status": task.status} for task in tasks]})

@app.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json()
    new_task = Task(name=data['name'], description=data.get('description',''), status=data['status'])
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'task': {'id': new_task.id, 'name': new_task.name, 'description':new_task.description, 'status':new_task.status}}), 201



@app.route('/tasks/<int:task_id>', methods=["PUT", "PATCH"])
def update_task(task_id):
    task = Task.query.get(task_id)
    if task is None:
        return jsonify({"error": "Task not found"}), 400
    
    data = request.get_json()

    if "name" in data:
        task.name = data['name']
    if "description" in data:
        task.description = data['description']
    if "status" in data:
        task.status = data['status']

    db.session.commit()

    return jsonify({"message": "Task updated successfully", "task": {"id": task.id, "name": task.name, "status": task.status, "description": task.description}}), 200



@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = Task.query.get(task_id)
    if task is None:
        return jsonify({"error": "Task not found"}), 404
    
    db.session.delete(task)
    db.session.commit()

    return jsonify({"message":"Task deleted successfully"}), 200

if __name__ == "__main__":
    app.run(debug=True)