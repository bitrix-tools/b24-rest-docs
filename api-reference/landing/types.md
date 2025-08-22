# Работа с типами сайтов и скоупами

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания

{% endnote %}

{% endif %}

## Типы сайтов

Сайты могут быть следующих типов.

- Основные:
  - PAGE (от Home Page) - обычные сайты.
  - STORE - магазины.
  - SMN - сайты, использующиеся в разделе Сайты24 в административном разделе в БУС.

- Дополнительные:
  - KNOWLEDGE – базы знаний.
  - GROUP – базы знаний групп соц.сети.

На данный момент не поддерживается расширение типов.

## Скоупы

Помимо разделительной функции на уровне компонентов существует также разграничение по правам, получившее название скоупов.

Если вы работаете с **основными типами**, ничего делать не нужно.
Если с **дополнительными**, перед работой нужно установить скоуп. В случае rest сделать это можно, передав дополнительным параметром **scope**.

## Пример

В примере дан метод получения списка страниц, но правило распространяется на любой другой метод, в том числе на работу с правами и изменениями сущностей.

{% list tabs %}

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    const params = {
        select: ['ID', 'TITLE'],
        filter: {
            TITLE: '%услуги%',
            SITE_ID: 205
        },
        order: {
            ID: 'DESC'
        }
    };
    
    try {
        const response = await $b24.callListMethod(
            'landing.landing.getList',
            { params, scope: 'knowledge' }
        );
        const items = response.getData() || [];
        for (const entity of items) {
            console.log('Entity:', entity);
        }
    } catch (error) {
        console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
        const generator = $b24.fetchListMethod('landing.landing.getList', { params, scope: 'knowledge' }, 'ID');
        for await (const page of generator) {
            for (const entity of page) {
                console.log('Entity:', entity);
            }
        }
    } catch (error) {
        console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
        const response = await $b24.callMethod('landing.landing.getList', { params, scope: 'knowledge' }, 0);
        const result = response.getData().result || [];
        for (const entity of result) {
            console.log('Entity:', entity);
        }
    } catch (error) {
        console.error('Request failed', error);
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
                    ],
                    'scope'  => 'knowledge'
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
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
            },
            scope: 'knowledge'
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

{% include [Сноска о примерах](../../_includes/examples.md) %}