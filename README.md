Cubix Vizsgafeladat

A vizsgafeladat egy Twitter klón alkalmazás elkészítése, ahol a
felhasználók bejelentkezés után tweeteket írhatnak, törölhetnek,
módosíthatnak.
Az összes felhasználót egy listaoldalon megjelenítjük, ez alapján
mindenkinek a tweetje megtekinthető belépés nélkül is.

Tervezés részei:
1. Szereplők és igényeik
2. use-case funkció lista
3. Magas szintű rendszerterv
4. Screenek
5. Routing
6. Middleware-ek
7. Modellek
8. Implementáció
9. Tesztelés

=====================================

1. Szereplők és igényeik
Szerepkörök, szereplő és igényeik:
Látogató:
    -láthatja az összes user-t (userlista) -> kattintva egyre átmegy az adott user oldalára, ahol láthatja annak tweetjét, tweetjeit
    -megtekintheti a userek tweet-jeit belépés nélkül is
    -nem tud tweet-et posztolni
    -ha nincs egy usernek még tweet-je, akkor üres lista (Nincs tweet-> ez a user még nem posztolt semmit)

Regisztrált felhasználó
    -Lehetőség van regisztrációra
    -Regisztráció: legyen e-mail validálás vagy sem? (Ha nincs egyből beléptethetjük a user-t, ha van, akkor még validálnia kell az e-mail címét...)
    -Tud tweet-et posztolni
    -Tud tweet-et törölni (csak a sajátját értelemszerűen)
    -Tud tweet-et módosítani (szintén csak a sajátját)
    -Tweet-ek láthatósága nem módosítható, mindig publikus

További felhasználók (opcionális):
Admin?
    -Posztok ellenőrzése (közösségi irányelvek esetleges megsértése)
    -Felhasználók letíltása
    -Tevékenységek logolása

=====================================

2. Use-case - funkció lista:

-Látogató:
    -tud regisztrálni (név, felhasználónév, e-mail, szül. idő /18 éves elmúlt-e/,
     jelszó, ÁSZF - Általános Szerződési Feltételek elfogadása??, jegyezzük a regisztráció dátumát)
    -ha ugyanazzal az e-mail-lel akar regisztrálni, akkor ne engedjük -> legyen ellenőrzés, hogy regisztrált-e már (ilyenkor látogatónak hívjuk azt az embert is, aki már regisztrált a rendszerbe, de elfelejtette)
    -ha regisztrált már (korábban vagy az adott session-ben), akkor be tud jelentkezni

-Felhasználó (regisztrált látogató):
    -ki tud jelentkezni... (obviously)
    -meg tudja nézni a felhasználók tweet-jeit
    -tudja "lájkolni" a tweet-et
    -ha rákattint egy másik felhasználóra, akkor lássuk a másik felhasználó adatait, tweet-jeit (posztjait)
    -ha saját profiljára kattint, akkor is lássa a saját posztjait, bejegyzéseit, tweet-jeit (esetleg annyiban különbözzön a többi felhasználó oldalától, hogy legyen egy Edit profile (Profil szerkesztése) gomb)
    -Profil szerkesztés: lehessen profilképet feltölteni, esetleg borítóképet feltölteni, Tartózkodási helyet (várost) beállítani
    -visszafelé mutató gomb (visszamenjen az előző oldalra (vagy meghatározott oldalra))
    Opcionális funkciók:
        -regisztráció social account-tal (facebook, google)
        -adatainak módosítása (profil edit) kérdés, hogy engedjük-e  megváltoztatni az e-mail címét (inkább másodlagos e-mail cím hozzáadása?)
        -születési idő megváltoztatása?? (ha jól adta meg, felesleges, ha nem, akkor kéne valami megoldás rá... egyszer engedjük változtatni, utána többet nem?)
        -jelszó megváltoztatása (küldjünk róla e-mail-t, hogy megváltoztatás)
        -retweet funkció (újratweeteli a posztot, újraposztolja a tweet-et)
        -képek tweet-elési lehetősége
        -követés funkció megvalósítása
        -hozzászólás egy poszthoz (tweet-hez)

=====================================

Route-ok /Endpoint-ok/:

GET / (/home)		Főoldal endpoint (nincs bejelentkezve: login/reg screen, ha be van, akkor főoldal (tweet folyam))
GET /registration   Regisztrációs form betöltése
POST /registration  Regisztráció, azután vissza a főoldalra vagy a felhasználó bejelentkeztetése (attól függően, hogy kell-e e-mail validálás)
GET /userlist       Felhasználók listája
GET /user/:id       Egy felhasználóhoz tartozó tweetek listázása
GET /tweets
