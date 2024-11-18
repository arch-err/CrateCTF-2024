# Red_teaming
*Jobbet som privatdetektiv är slitigt, man måste alltid vara på sina tår. Sittandes i en buske med en kikare spanar du in i mannens vardagsrum. Bakåtlutad i fåtöljen med fötterna på bordet och TV:n på högsta volym...*

## Solution
1. `cat data.bin | xxd` gives alot of repeated "`e0e0`" and "`f00f`".
2. Googling for this leads you to a lot of references to IR control and Samsung TVs
4. Using [this lookup-table](https://github.com/FarInHeight/Samsung-IR-Receiver-on-Bare-Metal-Pi/blob/main/lookup_table.f) I should probably be able to convert the bytes...
3. `./solve.py`


## Flag
**Flag:** `cratectf{infra-redteamingftw}`
