# Получить список страниц landing.landing.getList

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

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.landing.getList` получает список страниц.

{% note warning %}

Помеченные как удаленные страницы не фигурируют в выборках. Чтобы получить их явно, необходимо при фильтрации указать ключ `DELETED` со значением Y или N.

{% endnote %}

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **params**
[`unknown`](../../../data-types.md) | Опциональный массив, с опциональными ключами: **select**, **filter**, **order**, **group**, которые содержат значения таблицы [основных полей](../index.md) сущности.
Дополнительно можно передать флаги `get_preview = 1` (вернуть превью страниц), `get_urls = 1` (вернуть публичные адреса страниц), `check_area` (вернуть флаг IS_AREA является ли страница включаемой областью). ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    // callListMethod: Получает все данные сразу. Используйте только для небольших выборок (< 1000 элементов) из-за высокой нагрузки на память.
    
    try {
      const response = await $b24.callListMethod(
        'landing.landing.getList',
        {
          params: {
            select: [
              'ID', 'TITLE'
            ],
            filter: {
              TITLE: '%услуги%',
              SITE_ID: 205
            },
            order: {
              ID: 'DESC'
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
      const generator = $b24.fetchListMethod('landing.landing.getList', {
        params: {
          select: [
            'ID', 'TITLE'
          ],
          filter: {
            TITLE: '%услуги%',
            SITE_ID: 205
          },
          order: {
            ID: 'DESC'
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
      const response = await $b24.callMethod('landing.landing.getList', {
        params: {
          select: [
            'ID', 'TITLE'
          ],
          filter: {
            TITLE: '%услуги%',
            SITE_ID: 205
          },
          order: {
            ID: 'DESC'
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
                'landing.landing.getList',
                [
                    'params' => [
                        'select' => [
                            'ID', 'TITLE'
                        ],
                        'filter' => [
                            'TITLE'   => '%услуги%',
                            'SITE_ID' => 205
                        ],
                        'order'  => [
                            'ID' => 'DESC'
                        ]
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting landing list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.getList',
        {
            params: {
                select: [
                    'ID', 'TITLE'
                ],
                filter: {
                    TITLE: '%услуги%',
                    SITE_ID: 205
                },
                order: {
                    ID: 'DESC'
                }
            }
        },
        function(result)
        {
            if(result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}