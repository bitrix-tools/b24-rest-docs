# Создать пользовательское поле для счетов crm.invoice.userfield.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning %}

Метод устарел. Рекомендуется использовать  [`Универсальные методы для счетов`](../../universal/invoice.md)

{% endnote %}

Метод cоздает новое пользовательское поле для счетов.

Системное ограничение на название поля - 20 знаков. К названию пользовательского поля всегда добавляется префикс `UF_CRM_`, то есть реальная длина названия - 13 знаков.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields** | Набор полей - массив вида `array("поле"=>"значение"[, ...])`, содержащий описание пользовательского поля. Полное описание полей можно получить вызовом метода [crm.userfield.fields](../../universal/user-defined-fields/crm-userfield-fields.md). ||
|| **LIST** | Содержит набор значений списка для пользовательских полей типа Список. Указывается при создании/обновлении поля. Каждое значение представляет собой массив с полями: 
- **VALUE** -  значение элемента списка. Поле является обязательным в случае, когда создается новый элемент.  
- **SORT** - сортировка. 
- **DEF** - если равно Y, то элемент списка является значением по-умолчанию. Для множественного поля допустимо несколько DEF=Y. Для не множественного, дефолтным будет считаться первое.  
- **XML_ID** - внешний код значения. Параметр учитывается только при обновлении уже существующих значений элемента списка.
- **ID** - идентификатор значения. Если он указан, то считается что это обновление существующего значения элемента списка, а не создание нового. Имеет смысл только при вызове методов `*.userfield.update`.
- **DEL** - если равно Y, то существующий элемент списка будет удален. Применяется, если заполнен параметр ID. ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"SORT":"ASC"},"filter":{"%NAME":"Предложение"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.paysystem.list  
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"SORT":"ASC"},"filter":{"%NAME":"Предложение"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.paysystem.list
    ```

- JS


    ```js
    // callListMethod: Получает все данные сразу. Используйте только для небольших выборок (< 1000 элементов) из-за высокой нагрузки на память.
    
    try {
      const response = await $b24.callListMethod(
        'crm.paysystem.list',
        {
          order: {"SORT": "ASC"},
          filter: {
            "%NAME": "Предложение",
          }
        },
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod: Выбирает данные по частям с помощью итератора. Используйте для больших объемов данных для эффективного потребления памяти.
    
    try {
      const generator = $b24.fetchListMethod('crm.paysystem.list', {
        order: {"SORT": "ASC"},
        filter: {
          "%NAME": "Предложение",
        }
      }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod: Ручное управление постраничной навигацией через параметр start. Используйте для точного контроля над пакетами запросов. Для больших данных менее эффективен, чем fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.paysystem.list', {
        order: {"SORT": "ASC"},
        filter: {
          "%NAME": "Предложение",
        }
      }, 0)
      const result = response.getData().result || []
      for (const entity of result) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.paysystem.list',
                [
                    'order' => ['SORT' => 'ASC'],
                    'filter' => [
                        '%NAME' => 'Предложение',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        if ($response->more()) {
            $response->next();
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error listing payment systems: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.paysystem.list", {
            order: {"SORT": "ASC"},
            filter: {
                "%NAME": "Предложение",
            }
        },
        function (result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.dir(result.data());
                if (result.more())
                    result.next();
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.paysystem.list',
        [
            'order' => ['SORT' => 'ASC'],
            'filter' => ['%NAME' => 'Предложение']
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}