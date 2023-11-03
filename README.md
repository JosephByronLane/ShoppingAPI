# CustomAPI
CustomAPI Using JS with TS for Web


THINGS TO DO:
- Add default parameters where necesary in the entities
- Change all entity names to singluar & delete/change their names in the database aswell
- Add debugging operations into CRUD functions ("user added correctly", "error: no user introduced"," error: some error happened.")
- Better user feedback when making requests
- ~~update the PUT request to better handle chaging data~~
    - ~~What happens if we want to o nly change one value?~~
    - ~~Change multiple values at once?~~
    - ~~Make changes based on other things rather than id?~~
- Match in-code names with json expected names. (If json sends a value called 'name' make sure its also called 'name' in code and in the database)
- debate if deleting users should actially delete them or if it only sets them as not active
    - setting them as not active would mean changing PUT to only return the users who are active
    