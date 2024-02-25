

pip install fastapi-paginate[all] 
SQLAlchemy>=1.3.20

pip install hypercorn 
hypercorn -b 0.0.0.0:8200 servidor:app 
hypercorn -b 0.0.0.0:8200 servidor:app -w 4 --reload



pip install daphne
daphne -b 0.0.0.0 -p 8200 servidor:app
daphne -b 0.0.0.0 -p 8200 servidor:app --num-processes 4 --num-threads 4


#----------------------------------------
gunicorn -b 0.0.0.0:8000 your_module:app
-k uvicorn.workers.UvicornWorker
#-----------------------------------------



pip install gunicorn 
gunicorn -b 0.0.0.0:8200 -k uvicorn.workers.UvicornWorker servidor:app

gunicorn -b 0.0.0.0:8200  servidor:app
