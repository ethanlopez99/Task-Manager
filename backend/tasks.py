from flask import Blueprint, jsonify, request
from models import db, Task

tasks_bp = Blueprint("tasks", __name__)

@tasks_bp.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()
    return jsonify({"tasks": [{"id": task.id, "name": task.name, "description": task.description, "status": task.status, "tags": task.tags} for task in tasks]})



@tasks_bp.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json()
    new_task = Task(name=data['name'], description=data.get('description',''), status=data['status'], tags=data['tags'])
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'task': {'id': new_task.id, 'name': new_task.name, 'description':new_task.description, 'status':new_task.status, 'tags': new_task.tags}}), 201



@tasks_bp.route('/tasks/<int:task_id>', methods=["PUT", "PATCH"])
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
    if "tags" in data:
        task.tags = data['tags']

    db.session.commit()
    return jsonify({"message": "Task updated successfully", "task": {"id": task.id, "name": task.name, "status": task.status, "description": task.description, "tags": task.tags}}), 200



@tasks_bp.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = Task.query.get(task_id)
    if task is None:
        return jsonify({"error": "Task not found"}), 404
    
    db.session.delete(task)
    db.session.commit()

    return jsonify({"message":"Task deleted successfully"}), 200