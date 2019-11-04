# ido-crawler-server
Get novels online by crawler

## API
| - | meaning | method | params | return |
|---|---|---|---|---|
| /search| search book | GET | keyword(novel title) | book list |
| /chapter | get book chapters | GET| link(specify website novel link) | chapter list|
| /content | get chapter content | GET | link(specify website novel chapter link) | chapter content |

## TODO
- [×] Error trapping and logging
- [×] Stripping c1 and modularizing
- [×] Add new book sources and modular integration
- [×] More...