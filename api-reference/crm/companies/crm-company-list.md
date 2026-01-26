# Получить список компаний по фильтру crm.company.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствуют параметры или поля
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.company.list` возвращает список компаний по фильтру. Является реализацией списочного метода для компаний.

При выборке используйте маски:
- "*" - для выборки всех полей (без пользовательских и множественных)
- "UF_*" - для выборки всех пользовательских полей (без множественных)

Маски для выборки множественных полей нет. Для выборки множественных полей укажите нужные в списке выбора ("PHONE", "EMAIL" и так далее).

## Параметры

См. описание [списочных методов](../../../settings/how-to-call-rest-api/list-methods-pecularities.md).

## Примеры

**Поиск компаний по сфере деятельности и типу**

{% list tabs %}

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'crm.company.list',
        {
          order: { "DATE_CREATE": "ASC" },
          filter: { "INDUSTRY": "MANUFACTURING", "COMPANY_TYPE": "CUSTOMER" },
          select: [ "ID", "TITLE", "CURRENCY_ID", "REVENUE" ]
        },
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('crm.company.list', {
        order: { "DATE_CREATE": "ASC" },
        filter: { "INDUSTRY": "MANUFACTURING", "COMPANY_TYPE": "CUSTOMER" },
        select: [ "ID", "TITLE", "CURRENCY_ID", "REVENUE" ]
      }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.company.list', {
        order: { "DATE_CREATE": "ASC" },
        filter: { "INDUSTRY": "MANUFACTURING", "COMPANY_TYPE": "CUSTOMER" },
        select: [ "ID", "TITLE", "CURRENCY_ID", "REVENUE" ]
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
                'crm.company.list',
                [
                    'order'  => ['DATE_CREATE' => 'ASC'],
                    'filter' => ['INDUSTRY' => 'MANUFACTURING', 'COMPANY_TYPE' => 'CUSTOMER'],
                    'select' => ['ID', 'TITLE', 'CURRENCY_ID', 'REVENUE'],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        
        if ($result->more()) {
            $result->next();
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching company list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.company.list",
        {
            order: { "DATE_CREATE": "ASC" },
            filter: { "INDUSTRY": "MANUFACTURING", "COMPANY_TYPE": "CUSTOMER" },
            select: [ "ID", "TITLE", "CURRENCY_ID", "REVENUE" ]
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.dir(result.data());
                if(result.more())
                    result.next();
            }
        }
    );
    ```

{% endlist %}

**Поиск компании по телефону**

{% list tabs %}

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'crm.company.list',
        {
          filter: { "PHONE": "555888" },
          select: [ "ID", "TITLE" ]
        },
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('crm.company.list', { filter: { "PHONE": "555888" }, select: [ "ID", "TITLE" ] }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.company.list', { filter: { "PHONE": "555888" }, select: [ "ID", "TITLE" ] }, 0)
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
                'crm.company.list',
                [
                    'filter' => ['PHONE' => '555888'],
                    'select' => ['ID', 'TITLE'],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        
        if ($result->more()) {
            $result->next();
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching company list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.company.list",
        {
            filter: { "PHONE": "555888" },
            select: [ "ID", "TITLE" ]
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.dir(result.data());
                if(result.more())
                    result.next();
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Продолжите изучение

- [{#T}](../../../tutorials/crm/how-to-get-lists/search-by-phone-and-email.md)