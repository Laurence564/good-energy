## Login test matrix

| Condition      | SC1  | SC2   | SC3   | SC4   | SC5   | SC6   | SC7   | SC8   |
|----------------|------|-------|-------|-------|-------|-------|-------|-------|
| Empty username | TRUE | TRUE  | FALSE | FALSE | FALSE | FALSE | FALSE | FALSE |
| Empty password | TRUE | FALSE | TRUE  | FALSE | FALSE | FALSE | FALSE | FALSE |
| Known username | N/A  | N/A   | N/A   | TRUE  | FALSE | FALSE | TRUE  | TRUE  |
| Known password | N/A  | N/A   | N/A   | FALSE | TRUE  | FALSE | TRUE  | TRUE  |
| Account locked | N/A  | N/A   | N/A   | N/A   | N/A   | N/A   | TRUE  | FALSE |
| Outcome        | FAIL | FAIL  | FAIL  | FAIL  | FAIL  | FAIL  | FAIL  | PASS  |