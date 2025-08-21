# Создать группу соцсети sonet_group.create

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствует ответ в случае ошибки
- нет примеров на др. языках

{% endnote %}

{% endif %}

> Scope: [`sonet`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Создает группу соцсети, используя метод API `CSocNetGroup::CreateGroup()`, указывая владельцем группы текущего пользователя.

## Запрос:

```http
https://mydomain.bitrix24.ru/rest/sonet_group.create.json?auth=803f65e30340ff39703f8061c8b63a10&NAME=Test%20sonet%20group&VISIBLE=Y&OPENED=N&INITIATE_PERMS=K
```

## Ответ:

> 200 OK

```json
{"result":11}
```

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **arFields** | Массив параметров новой группы. Допустимые ключи массива:
**NAME** - название группы (обязательное поле),
**DESCRIPTION** - описание группы,
**VISIBLE** - флаг Y/N - видна ли группа в списке групп,
**OPENED** - флаг Y/N - открыта ли группа для свободного вступления,
**KEYWORDS** - ключевые слова,
**INITIATE_PERMS** - кто имеет право на приглашение пользователей в группу (обязательное поле):
- **A** - только владелец группы,
- **E** - владелец группы и модераторы группы,
- **K** - все члены группы.
**CLOSED** - флаг Y/N - является ли группа архивной,
**SPAM_PERMS** - кто имеет право на отправку сообщений в группу (обязательное поле). Значения аналогичны параметру INITIATE_PERMS.
**PROJECT** - флаг Y/N - является ли группа проектом или нет. по умолчанию - не является. (С версии 18.0.0)<br>**PROJECT_DATE_FINISH** - задаётся окончание проекта. (С версии 18.0.0)
**PROJECT_DATE_START** - задаётся начало проекта. (С версии 18.0.0)
**SCRUM_MASTER_ID** - если заполнен идентификатором пользователя, то этот проект станет скрамом. (С версии 22.300) ||
|| **bAutoSubscribe** | Автоподписывание на созданную тему. Необязательный параметр. По умолчанию имеет значение True. (С версии 10.0.0) ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

В случае успешного создания группы, возвращает ее ID, иначе - текст ошибки.

{% note info "" %}

**Примечание**: Создавать экстранет-группы с помощью REST API пока нельзя.

{% endnote %}

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod('sonet_group.create', {
    		'NAME': 'Test sonet group',
    		'VISIBLE': 'Y',
    		'OPENED': 'N',
    		'INITIATE_PERMS': 'K'
    	});
    
    	const result = response.getData().result;
    	console.log('Created social network group with ID:', result);
    	// Нужная вам логика обработки данных
    	processResult(result);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sonet_group.create',
                [
                    'NAME'          => 'Test sonet group',
                    'VISIBLE'       => 'Y',
                    'OPENED'        => 'N',
                    'INITIATE_PERMS' => 'K',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error creating sonet group: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    // Создадим видимую и открытую для вступления группу соцсети с именем 'Test sonet group' с правом приглашать новых членов группы для всех текущих членов группы

    BX24.callMethod('sonet_group.create', {
        'NAME': 'Test sonet group',
        'VISIBLE': 'Y',
        'OPENED': 'N',
        'INITIATE_PERMS': 'K'
    });
    ```

{% endlist %}


{% include [Сноска о примерах](../../_includes/examples.md) %}