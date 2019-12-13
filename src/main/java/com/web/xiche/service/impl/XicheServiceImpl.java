package com.web.xiche.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.web.xiche.dao.AccountFlowMapper;
import com.web.xiche.dao.CustomerMapper;
import com.web.xiche.dao.ProjectMapper;
import com.web.xiche.po.AccountFlow;
import com.web.xiche.po.Customer;
import com.web.xiche.po.Project;
import com.web.xiche.service.XicheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.List;

@Service
public class XicheServiceImpl implements XicheService {
	@Autowired
	ProjectMapper projectMapper;
	@Autowired
	AccountFlowMapper AccountFlowMapper;
	@Autowired
	CustomerMapper customerMapper;
	
	
	@Override
	public PageInfo<Project> findPageInfo(PageInfo<Project> pageInfo, Project project) {
		PageHelper.startPage(pageInfo.getPageNum(), pageInfo.getPageSize());
		return new PageInfo<Project>(projectMapper.findPage(project));
	}
	@Override
	public int saveOrUpdateProject(Project project) {
		int result = 0;
        Integer id = project.getId();
        project.setCreatetime(new Date());
        if (id == null){
            result = projectMapper.insertSelective(project);
        }else {
            result = projectMapper.updateByPrimaryKeySelective(project);
        }
        return  result;
	}
	@Override
	public Project findProjectById(int id) {
		return projectMapper.selectByPrimaryKey(id);
	}
	@Override
	public List<Project> findAll() {
		return projectMapper.findAll();
	}

    @Override
    public PageInfo<Customer> findPageCus(PageInfo<Customer> pageInfo, Customer customer) {
        PageHelper.startPage(pageInfo.getPageNum(), pageInfo.getPageSize());
        return new PageInfo<Customer>(customerMapper.findPage(customer));
    }

    @Override
	public PageInfo<AccountFlow> findAccountFlowPageInfo(PageInfo<AccountFlow> pageInfo, AccountFlow accountFlow) {
		PageHelper.startPage(pageInfo.getPageNum(), pageInfo.getPageSize());
		if(!StringUtils.isEmpty(accountFlow.getStart())&&!StringUtils.isEmpty(accountFlow.getEnd())){
            accountFlow.setStart(accountFlow.getStart()+" 00:00:00");
            accountFlow.setEnd(accountFlow.getEnd()+" 23:59:59");
        }
		return new PageInfo<AccountFlow>(AccountFlowMapper.findPage(accountFlow));
	}
	@Override
	public int saveOrUpdateAccountFlow(AccountFlow accountFlow) {
		Integer result = 0;
		Integer id = accountFlow.getId();
        Customer customer = customerMapper.selectByMobile(accountFlow.getMobile());
        if (customer != null) {
            accountFlow.setCustomerid(customer.getId());
        }
        AccountFlow accountFlow1 = null;
        if (id == null){
            accountFlow.setCreatetime(new Date());
            accountFlow1 = accountFlow;
            result = AccountFlowMapper.insertSelective(accountFlow);
        }else {
            accountFlow1 = AccountFlowMapper.selectByPrimaryKey(id);
            accountFlow1.setBalance(accountFlow1.getBalance() - accountFlow.getBalance());
            result = AccountFlowMapper.updateByPrimaryKeySelective(accountFlow);
        }
        Customer customer1 = new Customer();
        if (result > 0&&accountFlow.getCustomerid()>0&&customer!=null) {
            switch (accountFlow.getType()){
                case 1:
                    customer1.setId(customer.getId());
                    customer1.setPoints(accountFlow1.getBalance().intValue());
                case 2:
                    customer1.setId(customer.getId());
                    customer1.setBalance(accountFlow1.getBalance().intValue());
                case 3:
                    customer1.setId(customer.getId());
                    customer1.setCard(1);
            }
            customerMapper.updateMoney(customer1);
        }
        return  result;
	}
	@Override
	public AccountFlow findAccountFlowById(int id) {
		// TODO Auto-generated method stub
		return AccountFlowMapper.selectByPrimaryKey(id);
	}

    @Override
    public Customer findCustomerById(int id) {
        return customerMapper.selectByPrimaryKey(id);
    }

    @Override
    public int saveOrUpdateCustomer(Customer customer) {
        int result = 0;
        Integer id = customer.getId();
        customer.setCreatetime(new Date());
        if (id == null){
            result = customerMapper.insertSelective(customer);
        }else {
            result = customerMapper.updateByPrimaryKeySelective(customer);
        }
        return  result;
    }

}
