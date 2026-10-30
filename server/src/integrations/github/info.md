
### Structure 

| Component           | What it does                                       |
| ------------------- | -------------------------------------------------- |
| GitHub API          | The communication system provided by GitHub        |
| `github.client.ts`  | Establishes an authenticated connection to GitHub  |
| `github.service.ts` | Uses that connection to request repository data    |
| `github.routes.ts`  | Makes that data available through your backend API |
| Frontend            | Displays the repository data to you                |

#