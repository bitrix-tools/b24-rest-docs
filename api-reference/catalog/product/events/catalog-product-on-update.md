# Событие при изменении товара CATALOG.PRODUCT.ON.UPDATE

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие происходит при обновлении товара.


{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```
[
    'event' => 'CATALOG.PRODUCT.ON.UPDATE',    
    'event_handler_id' => 1,
    'data' => [
        'FIELDS' => [
            'ID' => 1,            
            'TYPE' => 1,
        ],
    ],
    'ts' => 1714649632,
    'auth' => [
        'access_token' => 's6p6eclrvim6da22ft9ch94ekreb52lv',
        'expires_in' => 3600,
        'scope' => 'catalog',
        'domain' => 'some-domain.bitrix24.com',
        'server_endpoint' => 'https://oauth.bitrix24.tech/rest/',
        'status' => 'F',
        'client_endpoint' => 'https://some-domain.bitrix24.com/rest/',
        'member_id' => 'a223c6b3710f85df22e9377d6c4f7553',
        'refresh_token' => '4s386p3q0tr8dy89xvmt96234v3dljg8',
        'application_token' => '51856fefc120afa4b628cc82d3935cce',
    ],
]
```

## Параметры

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **event***
[`string`](../../data-types.md) | Символьный код события ||
|| **event_handler_id***
[`integer`](../../data-types.md) | Идентификатор обработчика события ||
|| **data***
[`object`](../../data-types.md) | Объект с данными события.

Структура описана [ниже](#data) ||
|| **ts***
[`integer`](../../data-types.md) | Timestamp отправки события из очереди событий ||
|| **auth***
[`object`](../../data-types.md) | Объект с параметрами авторизации и данными о портале, на котором произошло событие ||
|#

### Параметр data {#data}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **FIELDS***
[`object`](../../data-types.md) | Объект со свойствами товара.

Структура описана [ниже](#fields) ||
|#

### Параметр FIELDS {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`catalog_product.id`](../../data-types.md#catalog_product)\|
[`catalog_product_sku.id`](../../data-types.md#catalog_product_sku)\|
[`catalog_product_offer.id`](../../data-types.md#catalog_product_offer)\|
[`catalog_product_service.id`](../../data-types.md#catalog_product_service) | Идентификатор товара. Получить все поля товара по его идентификатору можно с помощью методов:
- [catalog.product.get](../catalog-product-get.md) — для простых товаров
- [catalog.product.sku.get](../sku/catalog-product-sku-get.md) — для головных товаров
- [catalog.product.offer.get](../offer/catalog-product-offer-get.md) — для вариаций
- [catalog.product.service.get](../service/catalog-product-service-get.md) — для услуг
||
|| **TYPE***
[`integer`](../../data-types.md) | Тип товара:
- `1` — простой товар
- `3` — головной товар с вариациями
- `4` — вариация
- `5` — вариация без товара
- `6` — головной товар без вариаций
- `7` — услуга
||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-on-add.md)
- [{#T}](./catalog-product-on-delete.md)