



# 1. Configurar VPS
sudo timedatectl set-timezone Atlantic/Canary
sudo timedatectl set-ntp true

# 2. Verificar
timedatectl
date

# 3. Reiniciar servicios (opcional)
sudo systemctl restart mysql  # o mariadb
sudo systemctl restart your_python_app
