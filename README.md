# Semantic Commit Messages

Commit rule of this project

Format: `<type>(<scope>): <subject>`

`<scope>` is optional

## Example

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```

More Examples:

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)

---

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
## Authrntication
### Add authentication middleware
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

### Access user detail after authenticated
> Inside the request, there will be accountId field. If user exists, this should return the account ID of logged user
```
req.accountId
```

## Base response and errors handling
> Application's layers is already wrapped by default error handler. Consider using this implementation to make the application error handle more universial


1. Place `catchAsync` function before each route 
```
const viewMyAccount = catchAsync(async (req, res, next) => {
    const accountId = req.accountId

    const account = await accountService.getAccountById(accountId)

    res.json(account)

})
```

2. Error should throw with the following format
```
const account = await db.account.findUniqueOrThrow({
        where: {
            id: id
        }
    }).catch((e) => {
        throw new ApiError(HttpCode.NOT_FOUND, 'User Not Found!')
    })

    return account;
```