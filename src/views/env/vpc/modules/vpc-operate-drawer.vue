<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useNaiveForm } from '@/hooks/common/form';

defineOptions({
  name: 'VpcOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Env.Vpc | null;
}

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { restoreValidation } = useNaiveForm();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: '新增vpc',
    edit: '查看vpc'
  };
  return titles[props.operateType];
});

type Model = Api.Env.VpcOperateParams;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    vpcId: '',
    name: '',
    ipv4Cidr: '',
    ipv6Cidr: '',
    subNetworkNum: undefined,
    routeTableNum: undefined,
    natGatewayNum: undefined,
    vpnGatewayNum: undefined,
    networkAclNum: undefined,
    peerConnectionNum: undefined,
    cvmNum: undefined,
    nakeMachineNum: undefined,
    specialGatewayNum: undefined,
    defaultPrivateNetwork: '',
    tenantAppId: '',
    status: ''
  };
}

function handleUpdateModelWhenEdit() {
  if (props.operateType === 'add') {
    Object.assign(model, createDefaultModel());
    return;
  }

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

const fieldConfigs = [
  { label: 'vpc主键', key: 'vpcId' },
  { label: '名称', key: 'name' },
  { label: 'ipv4_cidr', key: 'ipv4Cidr' },
  { label: 'IPv6_cidr', key: 'ipv6Cidr' },
  { label: '子网', key: 'subNetworkNum' },
  { label: '路由表', key: 'routeTableNum' },
  { label: 'NAT网关', key: 'natGatewayNum' },
  { label: 'VPN网关', key: 'vpnGatewayNum' },
  { label: '网络ACL', key: 'networkAclNum' },
  { label: '对等连接', key: 'peerConnectionNum' },
  { label: '云主机', key: 'cvmNum' },
  { label: '裸金属服务', key: 'nakeMachineNum' },
  { label: '专线网关', key: 'specialGatewayNum' },
  { label: '默认私有网络', key: 'defaultPrivateNetwork' },
  { label: '租户', key: 'tenantAppId' }
];

watch(visible, () => {
  if (visible.value) {
    handleUpdateModelWhenEdit();
    restoreValidation();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" :title="title" display-directive="show" :width="800" class="max-w-90%">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NCard :bordered="false" class="info-card card-wrapper">
        <NSpin :show="false">
          <NDescriptions
            v-for="field in fieldConfigs"
            :key="field.key"
            :column="2"
            bordered
            label-placement="left"
            label-class="w-150px"
          >
            <NDescriptionsItem :label="field.label">{{ model[field.key as keyof Model] || '-' }}</NDescriptionsItem>
          </NDescriptions>
        </NSpin>
      </NCard>
      <!--
 <NGrid :cols="2" :x-gap="16" :y-gap="12" responsive="screen" class="pr-4">
        <NGi v-for="field in fieldConfigs" :key="field.key">
          <NFormItem :key="field.key" :label="field.label">
            <NText>
              {{
                model[field.key as keyof Model] || '-'
              }}
            </NText>
          </NFormItem>
        </NGi>
      </NGrid> 
-->
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.return') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped>
.card-wrapper {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.info-card {
  position: relative;
  overflow: hidden;
}
</style>
