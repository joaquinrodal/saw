from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from pydantic import BaseModel, constr
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

app = FastAPI()

# -----------------------------
# CORS SECURITY
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://tu-dominio.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

# -----------------------------
# RATE LIMITING
# -----------------------------
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# -----------------------------
# SECURITY HEADERS MIDDLEWARE
# -----------------------------
class SecureHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response: Response = await call_next(request)
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["Content-Security-Policy"] = "default-src 'self'"
        return response

app.add_middleware(SecureHeadersMiddleware)

# -----------------------------
# JWT AUTHENTICATION SETUP
# -----------------------------
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token")

# Dummy JWT validation (replace with real logic)
def verificar_token(token: str = Depends(oauth2_scheme)):
    if token != "supersecreto123":
        raise HTTPException(status_code=401, detail="Token inválido")

# -----------------------------
# USER INPUT VALIDATION
# -----------------------------
class UserInput(BaseModel):
    username: constr(min_length=3, max_length=20)
    email: constr(min_length=5, max_length=50)

# -----------------------------
# EXAMPLE ENDPOINTS
# -----------------------------
@app.post("/api/secure")
@limiter.limit("5/minute")
def secured_endpoint(user: UserInput, token: str = Depends(verificar_token)):
    return {"message": "Acceso autorizado", "user": user.dict()}

@app.get("/ping")
def ping():
    return {"status": "ok"}

# -----------------------------
# AUTH TOKEN ENDPOINT (DEMO)
# -----------------------------
@app.post("/token")
def login():
    # Aquí puedes agregar lógica real de login con usuarios
    return {"access_token": "supersecreto123", "token_type": "bearer"}
