# На обновление контакта

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указан тип параметра
- отсутствуют примеры (на других языках)

{% endnote %}

{% endif %}

{% note info "onCrmContactUpdate" %}

**Scope**: [`crm`](../../../scopes/permissions.md) | **Кто может подписаться**: `любой пользователь`

{% endnote %}

Событие `onCrmContactUpdate` вызывается при обновлении контакта.

#|
|| **Параметр** | **Описание** ||
|| **FIELDS** | Массив содержит поле ID со значением идентификатора обновленного контакта. ||
|#

## Примеры

- Контроллер, принимающий запрос:

```java
@PostMapping("/onCrmContactUpdate")
public ResponseEntity onCrmContactUpdate(@RequestParam("data[FIELDS][ID]") Long contactId) {
    // получаем контакт из Битрикс
    BitrixContactDto bitrixContactDto = deserializationBitrixUtil.deserializeContactForMethodGet(bitrixService.getContactById(contactId));
    // do something
    return new ResponseEntity(HttpStatus.OK);
}
```

- Метод получения контакта по id из Битрикс:

```java
public String getContactById(Long id) {
    MultiValueMap<String, String> paramsMap = new LinkedMultiValueMap<>();
    paramsMap.add("id", id.toString());
    String response = null;
    try {
        response = callApiGet("crm.contact.get", paramsMap);
    } catch (IOException | InterruptedException e) {
        e.printStackTrace();
    }
    return response;
}
```

- Десериализация ответа Битрикс:

```java
public BitrixContactDto deserializeContactForMethodGet(String contactJsonString) {
    BitrixContactDto contact = null;
    if (contactJsonString != null) {
        JsonNode jsonNode = null;
        try {
            jsonNode = (JsonNode) objectMapper.readTree(contactJsonString).get("result");
        } catch (IOException e) {
            e.printStackTrace();
        }
        contact = deserializeBitrixContactDto(jsonNode);
    }
    return contact;
}
```

- Объект BitrixContactDto:

```java
public class BitrixContactDto {
    private Long id;
    private String name;
    private String lastName;
    private String typeId;
    private String comments;
    private Set<String> email;

    public BitrixContactDto() {}

    public BitrixContactDto(Long id, String name, String lastName, String typeId, String comments) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.typeId = typeId;
        this.comments = comments;
    }
}
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}