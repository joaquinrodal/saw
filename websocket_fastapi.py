#------------------------------------------------------------
# WEBSOCKET 

class ConnectionManager:

    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.conexiones:Optional[List[Dict[str,Any]]] = []

    async def connect(self, websocket: WebSocket,id:int):
        await websocket.accept()
        self.active_connections.append(websocket)
        registro = {'ws':websocket,'id':id}
        self.conexiones.append(registro)
        await websocket.send_text('CONECTADO')
        print('CONEXIONES:------------------------------------>',self.conexiones)
      
     


    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        self.conexiones = list(filter(lambda x: x['ws'] != websocket, self.conexiones))
        print('CONEXIONES:---------------ELIMINADAS--------------------->',self.conexiones)
     

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)
  

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()

#------------------------------------------------------------------------------
@app.websocket("/wss/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
  
    await manager.connect(websocket,client_id)

    
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_personal_message(f"You wrote: {data}", websocket)
            await manager.broadcast(f"Client #{client_id} says: {data}")
     
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"Client #{client_id} left the chat")

@app.post("/enviar_ws")
async def enviar_ws():
    resultado = next(filter(lambda x: x['id'] == 184, manager.conexiones), None)
    await manager.send_personal_message(f"parar", resultado['ws'])
    return 'ok'
#-------------------------------------------------------------------------------------
