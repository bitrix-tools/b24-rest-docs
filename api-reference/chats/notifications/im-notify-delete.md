# Удалить уведомления im.notify.delete

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры
- не прописаны ссылки на несозданные ещё страницы

{% endnote %}

{% endif %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.notify.delete` удаляет уведомление.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **ID^*^**
[`unknown`](../../data-types.md) | `123` | Идентификатор уведомления | 18 ||
|| **TAG^*^**
[`unknown`](../../data-types.md) | `TEST` | Тег уведомления, уникальный в рамках системы. | 18 ||
|| **SUB_TAG^*^**
[`unknown`](../../data-types.md) | `SUB`\|`TEST` | Дополнительный тег, без проверки на уникальность | 18 ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

{% note warning %}

Указывать нужно **один из трех** обязательных параметров на выбор: `ID` (идентификатор уведомления), `TAG` (тег уведомления) или `SUB_TAG` (дополнительный тег).

{% endnote %}

## Примеры

{% include [Пояснение о restCommand](../_includes/rest-command.md) %}

{% list tabs %}

- PHP

    ```php
    $result = restCommand(
        'im.notify.delete',
        Array(
            'ID' => 13,
            'TAG' => 'TEST',
            'SUB_TAG' => 'SUB|TEST'
        ),
        $_REQUEST[
            "auth"
        ]
    );
    ```

- PHP (B24PhpSdk)

    ```php
    try {
        $notificationId = 123; // Replace with actual notification ID
        $notificationTag = null; // Replace with actual notification tag if needed
        $subTag = null; // Replace with actual sub tag if needed

        $result = $serviceBuilder->getIMScope()
            ->notify()
            ->delete($notificationId, $notificationTag, $subTag);

        if ($result->isSuccess()) {
            print($result->getCoreResponse()->getResponseData()->getResult()[0]);
        } else {
            print("Failed to delete notification.");
        }
    } catch (Throwable $e) {
        print("An error occurred: " . $e->getMessage());
    }
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{
    "result": true
}
```

**Результат выполнения**: `true` или ошибка.

## Ответ в случае ошибки

```json
{
    "error": "PARAMS_ERROR",
    "error_description": "Ошибка удаления уведомления"
}
```

### Описание ключей**:

- `error` – код возникшей ошибки
- `error_description` – краткое описание возникшей ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **PARAMS_ERROR** | Ошибка удаления уведомления ||
|#

## Ссылки по теме

- [{#T}](../messages/attachments/index.md)