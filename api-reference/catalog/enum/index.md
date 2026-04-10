# Перечисления Торгового каталога: обзор методов

Методы раздела возвращают справочные перечисления Торгового каталога для использования в других методах.

> Быстрый переход: [все методы](#all-methods)

## Где используются перечисления каталога

**Округление цен.** Метод [catalog.enum.getRoundTypes](./catalog-enum-get-round-types.md) возвращает коды типов округления. Эти значения используются при настройке правил округления через методы [catalog.roundingRule.*](../rounding-rule/index.md).

**Складские документы.** Метод [catalog.enum.getStoreDocumentTypes](./catalog-enum-get-store-document-types.md) возвращает типы документов складского учета. Эти значения используются в методах раздела [catalog.document.*](../document/index.md) при создании и обработке документов.

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [catalog.enum.getRoundTypes](./catalog-enum-get-round-types.md) | Возвращает список типов округления, оступных в каталоге ||
|| [catalog.enum.getStoreDocumentTypes](./catalog-enum-get-store-document-types.md) | Возвращает типы документов складского учета, доступные для REST ||
|#
