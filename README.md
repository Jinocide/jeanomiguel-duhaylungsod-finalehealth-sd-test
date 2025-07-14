

##  Getting Started

### Install Dependencies

```bash
npm run install-all
```

## 💻 Running the App

### Option 1: Separate Terminals

```bash
# Terminal 1
npm run start-api

# Terminal 2
npm run start-ui
```

### Option 2: Manual Run

```bash
cd patient-api && npm run start:dev
# In another terminal:
cd patient-ui && ng serve
```

---

## 🌐 API Endpoints

| Method | Endpoint                   | Description               |
|--------|----------------------------|---------------------------|
| GET    | `/patients`                | Get all patients          |
| POST   | `/patients`                | Add a new patient         |
| PUT    | `/patients/:id`            | Update a patient          |
| DELETE | `/patients/:id`            | Delete a patient          |
| GET    | `/patients/:id/visits`     | Get visits for a patient  |
| POST   | `/patients/:id/visits`     | Add a new visit           |
| PUT    | `/visits/:id`              | Update a visit            |
| DELETE | `/visits/:id`              | Delete a visit            |

---
## 👨‍💻 Author
Jeano Miguel Duhaylungsod
