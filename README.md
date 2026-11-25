# 🌱 Good Energy

[![typescript](https://img.shields.io/badge/typescript-7.0.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![playwright](https://img.shields.io/badge/playwright-1.65.1-2EAD33?logo=playwright&logoColor=2EAD33)](https://playwright.dev/)

## Test approach

### Chosen front end coverage
* Two areas: the **login form** and the **product order workflow**.
* The order workflow because it is the revenue path which is critical to any business.
* Login because account access is the user's security boundary.

Login tests are derived from the test matrix:
| Condition      | SC1  | SC2   | SC3   | SC4   | SC5   | SC6   | SC7   | SC8   |
|----------------|------|-------|-------|-------|-------|-------|-------|-------|
| Empty username | TRUE | TRUE  | FALSE | FALSE | FALSE | FALSE | FALSE | FALSE |
| Empty password | TRUE | FALSE | TRUE  | FALSE | FALSE | FALSE | FALSE | FALSE |
| Known username | N/A  | N/A   | N/A   | TRUE  | FALSE | FALSE | TRUE  | TRUE  |
| Known password | N/A  | N/A   | N/A   | FALSE | TRUE  | FALSE | TRUE  | TRUE  |
| Account locked | N/A  | N/A   | N/A   | N/A   | N/A   | N/A   | TRUE  | FALSE |
| Outcome        | FAIL | FAIL  | FAIL  | FAIL  | FAIL  | FAIL  | FAIL  | PASS  |

### Chosen API coverage
* Order access is restricted to the respective user logged into their account.
* Quantity validation prevents abuse of negative, zero or fractional quantities to manipulate price.
