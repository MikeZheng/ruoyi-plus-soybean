<script setup lang="ts">
import { useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';
defineOptions({
  name: 'VpcSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.Env.VpcSearchParams>('model', { required: true });

async function reset() {
  Object.assign(model.value.params!, {});
  await restoreValidation();
  emit('reset');
}

async function search() {
  await validate();
  emit('search');
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse>
      <NCollapseItem :title="$t('common.search')" name="user-search">
        <NForm ref="formRef" :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" label="vpc主键" path="vpcId" class="pr-24px">
              <NInput v-model:value="model.vpcId" placeholder="请输入vpc主键" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="名称" path="name" class="pr-24px">
              <NInput v-model:value="model.name" placeholder="请输入名称" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="ipv4_cidr" path="ipv4Cidr" class="pr-24px">
              <NInput v-model:value="model.ipv4Cidr" placeholder="请输入ipv4_cidr" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="IPv6_cidr" path="ipv6Cidr" class="pr-24px">
              <NInput v-model:value="model.ipv6Cidr" placeholder="请输入IPv6_cidr" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="子网" path="subNetworkNum" class="pr-24px">
              <NInput v-model:value="model.subNetworkNum" placeholder="请输入子网" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="路由表" path="routeTableNum" class="pr-24px">
              <NInput v-model:value="model.routeTableNum" placeholder="请输入路由表" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="NAT网关" path="natGatewayNum" class="pr-24px">
              <NInput v-model:value="model.natGatewayNum" placeholder="请输入NAT网关" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="VPN网关" path="vpnGatewayNum" class="pr-24px">
              <NInput v-model:value="model.vpnGatewayNum" placeholder="请输入VPN网关" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="网络ACL" path="networkAclNum" class="pr-24px">
              <NInput v-model:value="model.networkAclNum" placeholder="请输入网络ACL" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="对等连接" path="peerConnectionNum" class="pr-24px">
              <NInput v-model:value="model.peerConnectionNum" placeholder="请输入对等连接" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="云主机" path="cvmNum" class="pr-24px">
              <NInput v-model:value="model.cvmNum" placeholder="请输入云主机" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="裸金属服务" path="nakeMachineNum" class="pr-24px">
              <NInput v-model:value="model.nakeMachineNum" placeholder="请输入裸金属服务" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="专线网关" path="specialGatewayNum" class="pr-24px">
              <NInput v-model:value="model.specialGatewayNum" placeholder="请输入专线网关" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="默认私有网络" path="defaultPrivateNetwork" class="pr-24px">
              <NInput v-model:value="model.defaultPrivateNetwork" placeholder="请输入默认私有网络" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="租户" path="tenantAppId" class="pr-24px">
              <NInput v-model:value="model.tenantAppId" placeholder="请输入租户" />
            </NFormItemGi>
            <NFormItemGi span="24" class="pr-24px">
              <NSpace class="w-full" justify="end">
                <NButton @click="reset">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  {{ $t('common.reset') }}
                </NButton>
                <NButton type="primary" ghost @click="search">
                  <template #icon>
                    <icon-ic-round-search class="text-icon" />
                  </template>
                  {{ $t('common.search') }}
                </NButton>
              </NSpace>
            </NFormItemGi>
          </NGrid>
        </NForm>
      </NCollapseItem>
    </NCollapse>
  </NCard>
</template>

<style scoped></style>
