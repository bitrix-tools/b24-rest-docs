# Получить список доступных партнерских шаблонов landing.demos.getList

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

## Описание

Метод `landing.demos.getList` получает список доступных партнерских шаблонов текущего приложения.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **params**
[`unknown`](../../data-types.md) | Опциональный массив, с опциональными ключами:
- select
- filter
- order
- group
которые содержат значения таблицы основных полей сущности. Таблица размещена ниже. ||
|#

## Поля сущности

#|
|| **Поле** | **Описание** ||
|| **ID**
[`unknown`](../../data-types.md) | Идентификатор записи. ||
|| **XML_ID**
[`unknown`](../../data-types.md) | Уникальный код записи. ||
|| **APP_CODE**
[`unknown`](../../data-types.md) | Код текущего приложения. ||
|| **ACTIVE**
[`unknown`](../../data-types.md) | Активность (Y / N). ||
|| **TITLE**
[`unknown`](../../data-types.md) | Название. ||
|| **DESCRIPTION**
[`unknown`](../../data-types.md) | Описание. ||
|| **PREVIEW_URL**
[`unknown`](../../data-types.md) | URL предварительного просмотра. ||
|| **TYPE**
[`unknown`](../../data-types.md) | Тип создаваемого сайта (STORE, PAGE). ||
|| **TPL_TYPE**
[`unknown`](../../data-types.md) | Размещается в мастере создания сайта / магазина (S) или страницы (P). ||
|| **MANIFEST**
[`unknown`](../../data-types.md) | Манифест. ||
|| **SHOW_IN_LIST**
[`unknown`](../../data-types.md) | Показывать ли в списке шаблонов. ||
|| **PREVIEW / PREVIEW2X / PREVIEW3X**
[`unknown`](../../data-types.md) | Разноразмерные превью. ||
|| **CREATED_BY_ID**
[`unknown`](../../data-types.md) | Идентификатор пользователя создавшего запись ||
|| **MODIFIED_BY_ID**
[`unknown`](../../data-types.md) | Идентификатор пользователя изменившего запись. ||
|| **DATE_CREATE**
[`unknown`](../../data-types.md) | Дата создания. ||
|| **DATE_MODIFY**
[`unknown`](../../data-types.md) | Дата изменения. ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    // callListMethod: Получает все данные сразу. Используйте только для небольших выборок (< 1000 элементов) из-за высокой нагрузки на память.
    
    try {
      const response = await $b24.callListMethod(
        'landing.demos.getList',
        {
          params: {
            select: [
              'ID', 'TITLE', 'MANIFEST'
            ],
            filter: {
              '>ID': '1'
            }
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
      const generator = $b24.fetchListMethod('landing.demos.getList', {
        params: {
          select: [
            'ID', 'TITLE', 'MANIFEST'
          ],
          filter: {
            '>ID': '1'
          }
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
      const response = await $b24.callMethod('landing.demos.getList', {
        params: {
          select: [
            'ID', 'TITLE', 'MANIFEST'
          ],
          filter: {
            '>ID': '1'
          }
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
                'landing.demos.getList',
                [
                    'params' => [
                        'select' => [
                            'ID', 'TITLE', 'MANIFEST'
                        ],
                        'filter' => [
                            '>ID' => '1'
                        ]
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting list of demos: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.demos.getList',
        {
            params: {
                select: [
                    'ID', 'TITLE', 'MANIFEST'
                ],
                filter: {
                    '>ID': '1'
                }
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info(result.data());
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}