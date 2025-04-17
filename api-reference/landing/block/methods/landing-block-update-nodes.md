# Изменить контент блока landing.block.updatenodes

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
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

Метод `landing.block.updatenodes` изменяет контент блока. Возвращает _true_ или ошибку. Также метод применяется для [обновления параметров динамических блоков](#edit_params), таких как список товаров, детальный товар, и некоторых других.

## Параметры

#|
|| **Метод** | **Описание** | **С версии** ||
|| **lid**
[`unknown`](../../../data-types.md) | Идентификатор страницы | ||
|| **block**
[`unknown`](../../../data-types.md) | Идентификатор блока | ||
|| **data**
[`unknown`](../../../data-types.md) | Массив селекторов и новых значений.
Например: `data: {'.landing-block-node-text@1': 'new text!'}`. Принцип тот же - селектор и его новое значение. Если вы уверены, что селектор в блоке один, то в данном случае вы можете отбросить счетчик **@1**.
Также data зависит от типов изменяемых нод. Подробнее смотрите пример ниже, за описанием типов обращайтесь к [отдельной странице](../node-types.md). | ||
|#

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'landing.block.updatenodes',
        {
            lid: 311,
            block: 6058,
            data: {
                '.landing-block-node-text': 'Текст, с html',
                '.landing-block-node-img': {src: '/some/path/picture.png', alt: 'Моя картинка'},
                '.landing-block-node-link': {text: 'Моя ссылка', href: 'https://bitrix24.com', target: '_blank'},
                '.landing-block-node-icon': ['fa-telegram', 'fa-skype'],
                '.landing-block-node-embed': {src: '//www.youtube.com/embed/q4d8g9Dn3ww?autoplay=1&controls=0&loop=1&mute=1&rel=0', source: 'https://www.youtube.com/watch?v=q4d8g9Dn3ww'},
            },
        }
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

## Редактирование параметров динамических блоков

Есть ряд динамических блоков, параметры которых можно менять через REST. Например, количество товаров на странице. Сделать это можно следующим образом.

1. Посредством метода [landing.block.getmanifest](./landing-block-get-manifest.md) узнаем какие параметры у блока есть. Метод вернет массив манифеста, где нас интересует ключ `attrs` и параметры интересующего вас компонента динамического блока. В данном случае нам интересен `bitrix:catalog.section`.

    ```js
    attrs:
    bitrix:catalog.section: Array(24)
    0: {name: "ID раздела", style: false, original_type: "component", component_type: "STRING", attribute: "SECTION_ID", …}
    1: {name: "Недоступные товары", style: false, original_type: "component", component_type: "LIST", attribute: "HIDE_NOT_AVAILABLE", …}
    2: {name: "Недоступные торговые предложения", style: false, original_type: "component", component_type: "LIST", attribute: "HIDE_NOT_AVAILABLE_OFFERS", …}
    3: {name: "По какому полю сортируем элементы", style: false, original_type: "component", component_type: "LIST", attribute: "ELEMENT_SORT_FIELD", …}
    4: {name: "Порядок сортировки элементов", style: false, original_type: "component", component_type: "LIST", attribute: "ELEMENT_SORT_ORDER", …}
    5: {name: "Валюта, в которую будут сконвертированы цены", style: false, original_type: "component", component_type: "LIST", attribute: "CURRENCY_ID", …}
    6: {name: "Тип цены", style: false, original_type: "component", component_type: "LIST", attribute: "PRICE_CODE", …}
    ...
    ```

2. Через метод `landing.block.updatenodes` изменяем необходимые параметры. Так сложилось исторически, что динамические параметры (атрибуты) изменяются именно через этот метод.

    {% list tabs %}

    - JS

        ```js
        BX24.callMethod(
            'landing.block.updatenodes',
            {
                lid: 5597,
                block: 44131,
                data: {
                    'bitrix:catalog.section': {
                        attrs: {
                            'MESS_BTN_BUY': 'Add to my cart'
                        }
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
                        console.info(result.data());
                    }
                }
            }
        );
        ```

    {% endlist %}

