
sudo docker pull dbeaver/cloudbeaver:latest 
sudo docker run --name cloudbeaver --rm -ti -p 8090:8978 --add-host=host.docker.internal:82.223.128.190 -v /var/cloudbeaver/workspace:/opt/cloudbeaver/workspace dbeaver/cloudbeaver:dev
