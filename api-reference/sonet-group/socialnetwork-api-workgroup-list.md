# Получить список рабочих групп socialnetwork.api.workgroup.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
- нет примеров на др. языках

{% endnote %}

{% endif %}

> Scope: [`socialnetwork`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает список групп

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **filter** | Cоответствует параметру arFilter для метода API CSocNetGroup::getList. | ||
|| **select** | Массив, задающий выбираемые поля. Содержит список полей, которые должны быть возвращены методом. Если массив пустой, то выбираются поля ID, SITE_ID, NAME, DESCRIPTION, DATE_CREATE, DATE_UPDATE, DATE_ACTIVITY, ACTIVE, VISIBLE, OPENED, CLOSED, SUBJECT_ID, OWNER_ID, KEYWORDS, IMAGE_ID, NUMBER_OF_MEMBERS, INITIATE_PERMS, SPAM_PERMS, SUBJECT_NAME. В массиве допустимы любые поля из списка полей. | ||
|| **IS_ADMIN** | При передаче Y, проверяется, является ли текущий пользователь администратором соцсети и, если да, отключается проверка прав при выборке групп. | ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'socialnetwork.api.workgroup.list',
        {
          filter: {
            ID: 157,
          },
          select: ['ID', 'NAME']
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
      const generator = $b24.fetchListMethod('socialnetwork.api.workgroup.list', {
        filter: {
          ID: 157,
        },
        select: ['ID', 'NAME']
      }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('socialnetwork.api.workgroup.list', {
        filter: {
          ID: 157,
        },
        select: ['ID', 'NAME']
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
                'socialnetwork.api.workgroup.list',
                [
                    'filter' => [
                        'ID' => 157,
                    ],
                    'select' => [ 'ID', 'NAME' ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching workgroup list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod('socialnetwork.api.workgroup.list', {
        filter: {
            ID: 157,
        },
        select: [ 'ID', 'NAME' ]
    }, result => {
        console.log(result);
    });
    ```

{% endlist %}


{% include [Сноска о примерах](../../_includes/examples.md) %}