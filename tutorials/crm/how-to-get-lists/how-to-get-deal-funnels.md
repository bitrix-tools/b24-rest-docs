# Как получить воронку заданного направления с семантикой каждой стадии сделки

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Пример выводит все существующие направления сделок с семантикой по каждой стадии.

{% list tabs %}

- JS

    ```js
    var arCategory = [];

    BX24.callMethod('crm.dealcategory.list', {}, function(result) {
        if (result.error()) {
            console.error(result.error());
        } else {
            arCategory = result.data().reduce(function(acc, item) {
                acc[item.ID] = item.NAME;
                return acc;
            }, {});

            BX24.callMethod('crm.dealcategory.default.get', {}, function(result) {
                if (result.error()) {
                    console.error(result.error());
                } else {
                    arCategory[result.data().ID] = result.data().NAME;

                    Object.keys(arCategory).forEach(function(id) {
                        var entity_id = id > 0 ? 'DEAL_STAGE_' + id : 'DEAL_STAGE';

                        BX24.callMethod('crm.status.list', { filter: { ENTITY_ID: entity_id } }, function(resultDeal) {
                            if (resultDeal.error()) {
                                console.error(resultDeal.error());
                            } else {
                                var table = document.createElement('table');
                                var caption = document.createElement('caption');
                                caption.textContent = arCategory[id];
                                table.appendChild(caption);

                                var thead = document.createElement('thead');
                                var trHead = document.createElement('tr');
                                ['STATUS ID', 'NAME', 'SEMANTICS'].forEach(function(text) {
                                    var th = document.createElement('th');
                                    th.textContent = text;
                                    trHead.appendChild(th);
                                });
                                thead.appendChild(trHead);
                                table.appendChild(thead);

                                var tbody = document.createElement('tbody');
                                resultDeal.data().forEach(function(item) {
                                    var tr = document.createElement('tr');
                                    if (item.EXTRA && item.EXTRA.COLOR) {
                                        tr.style.color = item.EXTRA.COLOR;
                                    }
                                    ['STATUS_ID', 'NAME', 'EXTRA.SEMANTICS'].forEach(function(key) {
                                        var td = document.createElement('td');
                                        td.textContent = key.split('.').reduce(function(acc, k) {
                                            return acc && acc[k];
                                        }, item);
                                        tr.appendChild(td);
                                    });
                                    tbody.appendChild(tr);
                                });
                                table.appendChild(tbody);

                                document.body.appendChild(table);
                            }
                        });
                    });
                }
            });
        }
    });
    ```

- PHP

    {% note info %}

    Для использования примеров на PHP настройте работу класса *CRest* и подключите файл **crest.php** в файлах, где используется этот класс. [Подробнее](../../../first-steps/how-to-use-examples.md)

    {% endnote %}

    ```php
    $arCategory = [];
    $result = CRest::call('crm.dealcategory.list');
    if (!empty($result['result']))
    {
        $arCategory = array_column($result['result'], 'NAME', 'ID');
    }
    $result = CRest::call('crm.dealcategory.default.get');//get name default deal category
    if (!empty($result['result']))
    {
        $arCategory[$result['result']['ID']] = $result['result']['NAME'];
    }
    foreach ($arCategory as $id => $name):
        if ($id > 0)
        {
            $entity_id = 'DEAL_STAGE_' . $id;
        }
        else
        {
            $entity_id = 'DEAL_STAGE';
        }
        $resultDeal = CRest::call('crm.status.list', ['filter' => ['ENTITY_ID' => $entity_id]]);
        if (!empty($resultDeal['result'])):
    ?>
            <table>
                <caption><?=$name?></caption>
                <thead>
                <tr>
                    <th>STATUS ID</th>
                    <th>NAME</th>
                    <th>SEMANTICS</th>
                </tr>
                </thead>
                <tbody>
                <? foreach ($resultDeal['result'] as $item): ?>
                <tr <?=(!empty($item['EXTRA']['COLOR']) ? ' style="color:' . $item['EXTRA']['COLOR'] . '"' : '');?>>
                    <td><?=$item['STATUS_ID']?></td>
                    <td><?=$item['NAME']?></td>
                    <td><?=$item['EXTRA']['SEMANTICS']?></td>
                <tr>
                    <? endforeach; ?>
                </tbody>
            </table>
        <? endif; ?>
    <? endforeach; ?>
    ```

{% endlist %}
