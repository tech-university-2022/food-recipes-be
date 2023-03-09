# Installation & Commands

## Installation
```
npm i 
```

## Development

Run dependencies services
```
docker compose --env-file .env up
npm run start:dev # in a different terminal session
```

## Migrate and generate prisma
```
npx run migrate
npx run generate
```

# Development
## Add authentication middleware
> In order to use authentication middleware, add it in the router or controller before the request handler

**router.js**
```
import auth from '../../middlewares/auth.middleware.js'
const router = express.Router();
router.use(auth)
```

**controller.js**
```
router.get('/protected', auth, (req, res, next) => {
    res.json('protected')
})
```