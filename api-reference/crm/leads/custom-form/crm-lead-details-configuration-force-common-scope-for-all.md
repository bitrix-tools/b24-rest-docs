# Установить общую карточку для всех пользователей crm.lead.details.configuration.forceCommonScopeForAll

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Разрешить изменять настройки» в CRM

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [crm.item.details.configuration.forceCommonScopeForAll](../../universal/item-details-configuration/crm-item-details-configuration-forceCommonScopeForAll.md).

{% endnote %}

Метод `crm.lead.details.configuration.forceCommonScopeForAll` принудительно устанавливает общую карточку лидов для всех пользователей, удаляя их личную настройку карточки лида.

{% note warning %}

Настройки карточки повторных лидов могут отличаться от настроек карточки простых лидов. Для переключения между настройками карточек лидов применяйте параметр `leadCustomerType`.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **extras**
[`object`](../../../data-types.md) | Дополнительные параметры для выбора типа лида. Структура описана [ниже](#extras) ||
|#

### Параметр extras {#extras}

#|
|| **Название**
`тип` | **Описание** ||
|| **leadCustomerType**
[`integer`](../../../data-types.md) | Тип лида. Возможные значения:
- `1` - простой лид
- `2` - повторный лид ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"extras":{"leadCustomerType":2}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.lead.details.configuration.forceCommonScopeForAll
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"extras":{"leadCustomerType":2},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.lead.details.configuration.forceCommonScopeForAll
  ```

- JS

  ```js
  try
  {
      const response = await $b24.callMethod(
          'crm.lead.details.configuration.forceCommonScopeForAll',
          {
              extras: {
                  leadCustomerType: 2,
              },
          }
      );

      const result = response.getData().result;
      console.info(result);
  }
  catch (error)
  {
      console.error(error);
  }
  ```

- PHP

  ```php
  try {
      $response = $b24Service
          ->core
          ->call(
              'crm.lead.details.configuration.forceCommonScopeForAll',
              [
                  'extras' => [
                      'leadCustomerType' => 2,
                  ],
              ]
          );

      $result = $response
          ->getResponseData()
          ->getResult();

      echo 'Result: ' . print_r($result, true);
  } catch (Throwable $e) {
      error_log($e->getMessage());
      echo 'Error: ' . $e->getMessage();
  }
  ```

- BX24.js

  ```javascript
  BX24.callMethod(
      'crm.lead.details.configuration.forceCommonScopeForAll',
      {
          extras: {
              leadCustomerType: 2
          }
      },
      function(result)
      {
          if (result.error())
          {
              console.error(result.error());
          }
          else
          {
              console.log(result.data());
          }
      }
  );
  ```

- PHP CRest

  ```php
  require_once('crest.php');

  $result = CRest::call(
      'crm.lead.details.configuration.forceCommonScopeForAll',
      [
          'extras' => [
              'leadCustomerType' => 2,
          ],
      ]
  );

  echo '<PRE>';
  print_r($result);
  echo '</PRE>';
  ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1720687903.685834,
        "finish": 1720687904.076471,
        "duration": 0.3906371593475342,
        "processing": 0.02508091926574707,
        "date_start": "2024-07-11T10:51:43+02:00",
        "date_finish": "2024-07-11T10:51:44+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа. Возвращает `true`, если операция выполнена успешно ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | Access denied | Недостаточно прав для принудительной установки общей карточки ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-lead-details-configuration-get.md)
- [{#T}](./crm-lead-details-configuration-reset.md)
- [{#T}](./crm-lead-details-configuration-set.md)





