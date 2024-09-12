# Измененить сделку crm.deal.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (на других языках)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.deal.update` обновляет существующую сделку.

#|
|| **Параметр** | **Описание** ||
|| **id** | Идентификатор сделки. ||
|| **fields** | [Набор полей](./crm-deal-add.md), массив вида `array("обновляемое поле"=>"значение"[, ...])`, где "обновляемое поле" может принимать значения из возвращаемых методом [crm.deal.fields](./crm-deal-fields.md). 

{% note info %} 

Чтобы узнать требуемый формат полей, выполните метод [crm.deal.fields](./crm-deal-fields.md) и посмотрите формат пришедших значений этих полей. 

{% endnote %} ||
|| **params** | Набор параметров. `REGISTER_SONET_EVENT` - произвести регистрацию события изменения сделки в живой ленте. Дополнительно будет отправлено уведомление ответственному за сделку. ||
|#

## Пример

```js
var id = prompt("Введите ID");
BX24.callMethod(
    "crm.deal.update",
    {
        id: id,
        fields:
        {
            "STAGE_ID": "NEGOTIATION",
            "PROBABILITY": 70
        },
        params: { "REGISTER_SONET_EVENT": "Y" }
    },
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
        {
            console.info(result.data());
        }
    }
);
```

Как через веб хук загрузить файл в сделку (PHP)

```php
$batchUpdate = array (
    'update_contact' => 'crm.deal.update?'.http_build_query(
        array(
            'id'=> $dealId,
            'fields'=> array(
                'fileData'=>array(
                    $files['files']['name'], base64_encode(file_get_contents($files['files']['tmp_name'])),
                )
            ),
        )
    )
)

$resultUpdate = executeHook(array('cmd' => $batchUpdate)); // выполняем хук
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Пояснения к методу

Для управления контактами сделки рекомендуется использовать множественное поле CONTACT_IDS:

Пример:

```js
BX24.callMethod("crm.deal.update", { id: 1, fields: { "CONTACT_IDS": [ 1, 2, 3 ] } });
```

В результате сделка будет связана с тремя указанными контактами.

Поле `CONTACT_ID` является устаревшим и поддерживается для обеспечения обратной совместимости.

Пример:

```js
BX24.callMethod("crm.deal.update", { id: 1, fields: { "CONTACT_ID": 4 } });
```

В результате этого вызова в сделку будет добавлена связь с указанным контактом. 

{% note warning %}

Пожалуйста, обратите внимание, что уже существующие связи с контактами при этом удалены не будут. То есть если сделка до этого была связана с контактами 1, 2 и 3, то в результате она будет связана с контактами 1, 2, 3 и 4.

{% endnote %}


{% note tip "Связанные методы и темы" %}

[{#T}](./recurring-deals/crm-deal-recurring-update.md)

{% endnote %}