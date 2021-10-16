# dependencies
from dbstring import database, connect_string
# relational database class with our data retrieval functions
from wine_data import wine_data 
# mongodb database class with the same function signitures ( same functions)
# from BellyButtonMongo import BellyButtonMongo

from flask import Flask, jsonify, render_template

#################################################
# Database Setup
#################################################

data = wine_data

#################################################
# Flask Setup
#################################################
application = Flask(__name__)


#################################################
# Flask Routes
#################################################

@application.route("/")
def index():

    return render_template("index.html", data=data)

# @application.route("/api/v1.0")
# def show_apis():
#     """List all available api routes."""
#     return (
#         f"<h4>Available Routes:</h4>"
#         f'<a href="/api/v1.0/ids">/api/v1.0/ids</a><br/>'       
#         f'<a href="/api/v1.0/info/1286">/api/v1.0/info/subject_id</a><br/>' 
#         f'<a href="/api/v1.0/subjects">/api/v1.0/subjects</a><br/>' 
#         f'<a href="/api/v1.0/subjects/1286">/api/v1.0/subjects/subject_id</a><br/>' 
#         f'<a href="/"><h4>Back</h4></a><br/>' 
#     )    

# @application.route("/api/v1.0/ids")
# def get_all_ids():
#     return jsonify(data.get_subject_ids())

# @application.route("/api/v1.0/info")
# def get_all_results():
#     return jsonify(data.get_data_for_all())    

# @application.route("/api/v1.0/info/<subject_id>")
# def get_one_user_results(subject_id):
#     return jsonify(data.get_data_by_user(subject_id))    

# @application.route("/api/v1.0/subjects")
# def get_all_subjects():
#     return jsonify(data.get_subjects())

# @application.route("/api/v1.0/subjects/<subject_id>")
# def get_one_subject(subject_id):
#     return jsonify(data.get_subjects(subject_id))



if __name__ == '__main__':
    application.run(debug=True)
